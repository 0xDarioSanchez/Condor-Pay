#!/bin/bash
set -e

#######################################
# CONFIG
#######################################

NETWORK="testnet"
SOURCE="condor-admin"

TOKEN_ALIAS="mock-token"
MAIN_ALIAS="condorpay"

ENV_FILE=".env"

#######################################
# BUILD
#######################################

echo "************************************"
echo -e "\t*****Building*****..."
echo "************************************"

stellar contract build --package mock-token --optimize
stellar contract build --package condorpay --optimize


#######################################
# DEPLOY MOCK TOKEN (always fresh)
#######################################

echo "🚀 Deploying mock token..."

stellar contract alias remove $TOKEN_ALIAS 2>/dev/null || true

stellar contract deploy \
  --wasm target/wasm32v1-none/release/mock_token.wasm \
  --source $SOURCE \
  --network $NETWORK \
  --alias $TOKEN_ALIAS \
  -- \
  --admin $SOURCE \
  --initial_supply 100000000000

TOKEN_CONTRACT_ID=$(stellar contract alias show $TOKEN_ALIAS)

echo "✅ Mock token deployed: $TOKEN_CONTRACT_ID"


#######################################
# DEPLOY OR REUSE MAIN CONTRACT
#######################################

deploy_main() {

  stellar contract alias remove $MAIN_ALIAS 2>/dev/null || true

  stellar contract deploy \
    --wasm target/wasm32v1-none/release/condorpay.wasm \
    --source $SOURCE \
    --network $NETWORK \
    --alias $MAIN_ALIAS \
    -- \
    --admin $SOURCE \
    --token "$TOKEN_CONTRACT_ID"

  CONTRACT_ID=$(stellar contract alias show $MAIN_ALIAS)
}

reuse_main() {

  if stellar contract alias show $MAIN_ALIAS >/dev/null 2>&1; then
      CONTRACT_ID=$(stellar contract alias show $MAIN_ALIAS)
      echo "♻️ Using existing contract: $CONTRACT_ID"
  else
      echo "⚠️ Alias not found — deploying..."
      deploy_main
  fi
}


echo "**********************************"
echo -e "\t****Deploying & Initializing**** ..."
echo "**********************************"

if [ "$REUSE_CONTRACT" = "true" ]; then
    reuse_main
else
    deploy_main
fi

echo "✅ Main contract: $CONTRACT_ID"


#######################################
# FUND TEST ACCOUNTS
#######################################

echo "💰 Funding test accounts..."

stellar contract invoke \
  --id $TOKEN_CONTRACT_ID \
  --source condor-admin \
  --network $NETWORK \
  -- \
  mint \
  --caller condor-admin \
  --to borrower-1 \
  --amount 100000000

stellar contract invoke \
  --id $TOKEN_CONTRACT_ID \
  --source condor-admin \
  --network $NETWORK \
  -- \
  mint \
  --caller condor-admin \
  --to investor-1 \
  --amount 100000000

#######################################
# UPDATE ENV
#######################################

if [ -f "$ENV_FILE" ]; then

    if grep -q "PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=" "$ENV_FILE"; then
        sed -i "s|PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=.*|PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=$CONTRACT_ID|" "$ENV_FILE"
    else
        echo "" >> "$ENV_FILE"
        echo "PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=$CONTRACT_ID" >> "$ENV_FILE"
    fi

    echo "✅ Updated .env"

else
    echo "⚠️ .env file not found"
fi


#######################################
# STOP EARLY IF REUSE
#######################################

if [ "$REUSE_CONTRACT" = "true" ]; then
    echo ""
    echo "✅ Contract ready (state preserved)"
    echo "Frontend uses: $CONTRACT_ID"
    exit 0
fi


#######################################
# FULL TEST WORKFLOW
#######################################

echo ""
echo "=========================================================="
echo "  Running full test workflow on fresh contract..."
echo "=========================================================="
echo ""

# Register users
echo " ==== Register Borrower 1... ===="
stellar contract invoke --id $CONTRACT_ID --source borrower-1 --network $NETWORK -- \
  register_as_borrower --user borrower-1 --personal_data '"Borrower 1 Data"'

echo " ==== Register Investor 1... ===="
stellar contract invoke --id $CONTRACT_ID --source investor-1 --network $NETWORK -- \
  register_as_investor --user investor-1

echo " ==== Create Pool 1... ===="
stellar contract invoke --id $CONTRACT_ID --source $SOURCE --network $NETWORK -- \
  create_pool --address $SOURCE --yearly_interest_rate 2000

echo " ==== Create Invoice 1... ===="
stellar contract invoke \
  --id $CONTRACT_ID \
  --source borrower-1 \
  --network $NETWORK \
  -- \
  create_invoice \
  --creator borrower-1 \
  --amount 50000 \
  --duration 30 \
  --invoice_info '"Invoice 1"' \
  --pool_id 1

# Validate invoice
echo " ==== Validate Invoice 1... ===="
stellar contract invoke --id $CONTRACT_ID --source $SOURCE --network $NETWORK -- \
  validate_invoice --address $SOURCE --invoice_id 1 --validate true

# Invest
echo " ==== Invest in Pool 1... ===="
stellar contract invoke --id $CONTRACT_ID --source investor-1 --network $NETWORK -- \
  invest_in_pool --user investor-1 --pool_id 1 --amount 50000


# Claim reward
echo " ==== Claim Reward for Investor 1... ===="
stellar contract invoke --id $CONTRACT_ID --source investor-1 --network $NETWORK -- \
  claim_reward --user investor-1 --pool_id 1

# Pay debt
echo " ==== Pay Debt for Invoice 1... ===="
stellar contract invoke --id $CONTRACT_ID --source borrower-1 --network $NETWORK -- \
  pay_debt --invoice_id 1

echo " ==== GET Methods... ===="
# Read state
stellar contract invoke --id $CONTRACT_ID --source borrower-1 --network $NETWORK -- \
  get_borrower --user borrower-1

stellar contract invoke --id $CONTRACT_ID --source investor-1 --network $NETWORK -- \
  get_investor --user investor-1

stellar contract invoke --id $CONTRACT_ID --source $SOURCE --network $NETWORK -- \
  get_pool_balance --pool_id 1

stellar contract invoke --id $CONTRACT_ID --source $SOURCE --network $NETWORK -- \
  get_invoice --invoice_id 1


echo ""
echo "✅ All CondorPay contract functions executed."
