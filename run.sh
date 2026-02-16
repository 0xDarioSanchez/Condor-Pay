#!/bin/bash
set -e




# Lance Protocol - Anonymous Voting Demo Script
#
# USAGE:
#   ./run.sh              - Deploy fresh contract (clean state) [DEFAULT]
#   REUSE_CONTRACT=true ./run.sh  - Reuse existing contract (state persists)

echo "************************************"
echo -e "\t*****Building*****..."
echo "************************************"
cargo build --target wasm32v1-none --release && stellar contract optimize --wasm target/wasm32v1-none/release/condorpay.wasm

echo "**********************************"
echo -e "\t****Deploying & Initializing**** ..."
echo "**********************************"

# Check if we should reuse existing contract or deploy fresh (default)
if [ "$REUSE_CONTRACT" = "true" ]; then
    echo "♻️  Reusing existing contract (state persists)..."
    
    # Check if alias exists
    if stellar contract alias show condorpay 2>/dev/null; then
        CONTRACT_ID=$(stellar contract alias show condorpay)
        echo "✅ Using existing contract: $CONTRACT_ID"
    else
        echo "⚠️  No existing contract found. Deploying new one..."
        
        # Deploy and initialize in one step
        stellar contract deploy \
          --wasm target/wasm32v1-none/release/condorpay.optimized.wasm \
          --source-account condor-admin \
          --network testnet \
          --alias condorpay \
          -- \
          --admin condor-admin
        
        CONTRACT_ID=$(stellar contract alias show condorpay)
        echo "✅ Deployed new contract: $CONTRACT_ID"
    fi
else
    echo "🗑️  Removing old contract alias for fresh deployment..."
    stellar contract alias remove condorpay 2>/dev/null || true
    
    echo "📦 Deploying fresh contract with new state..."
    
    # Deploy and initialize in one step, capture contract ID
    stellar contract deploy \
      --wasm target/wasm32v1-none/release/condorpay.optimized.wasm \
      --source-account condor-admin \
      --network testnet \
      --alias condorpay \
      -- \
            --admin condor-admin
    
    CONTRACT_ID=$(stellar contract alias show condorpay)
    echo "✅ Deployed new contract: $CONTRACT_ID"
fi

# Update .env file with new contract ID
if [ -f ".env" ]; then
    # Check if the line exists
    if grep -q "PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=" .env; then
        # Update existing line (works on both macOS and Linux)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=.*|PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=$CONTRACT_ID|" .env
        else
            sed -i "s|PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=.*|PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=$CONTRACT_ID|" .env
        fi
        echo "✅ Updated .env file with new contract ID"
    else
        # Append if doesn't exist
        echo "" >> .env
        echo "PUBLIC_LANCE_PROTOCOL_CONTRACT_ID=$CONTRACT_ID" >> .env
        echo "✅ Added contract ID to .env file"
    fi
else
    echo "⚠️  Warning: .env file not found. Contract ID: $CONTRACT_ID"
fi

echo "📝 Contract ID: $CONTRACT_ID"

# Skip test flow if reusing existing contract
if [ "$REUSE_CONTRACT" = "true" ]; then
    echo ""
    echo "✅ Contract ready! State persists across restarts."
    echo "   Frontend will use: $CONTRACT_ID"
    echo ""
    echo "💡 Tip: Run './run.sh' to deploy with clean state (default)"
    exit 0
fi

echo ""
echo "=========================================================="
echo "  Running full test workflow on fresh contract..."
echo "=========================================================="
echo ""

echo "***********************************************"
echo -e "\tDeploying and testing CondorPay contract..."
echo "***********************************************"

# Build and deploy CondorPay contract
cargo build --target wasm32v1-none --release
stellar contract optimize --wasm target/wasm32v1-none/release/condorpay.wasm

stellar contract alias remove condorpay-contract 2>/dev/null || true
stellar contract deploy \
  --wasm target/wasm32v1-none/release/condorpay.optimized.wasm \
  --source-account condor-admin \
  --network testnet \
  --alias condorpay-contract \
  -- \
    --admin condor-admin

CONDORPAY_ID=$(stellar contract alias show condorpay-contract)
echo "✅ Deployed CondorPay contract: $CONDORPAY_ID"


########################################
# DEPLOY CONDORPAY CONTRACT (ALWAYS SAME ADDRESS)
########################################

CONDORPAY_ALIAS="condorpay-contract"
CONDORPAY_SALT="00000000000000000000000000000001"

echo "🚀 Deploying CondorPay (always same address)..."
stellar contract alias remove $CONDORPAY_ALIAS 2>/dev/null || true
stellar contract deploy \
    --wasm target/wasm32v1-none/release/condorpay.optimized.wasm \
    --source-account condor-admin \
    --network testnet \
    --alias $CONDORPAY_ALIAS \
    --salt $CONDORPAY_SALT \
    -- \
    --admin condor-admin

CONTRACT_ID=$(stellar contract alias show $CONDORPAY_ALIAS)
echo "✅ CondorPay deployed: $CONTRACT_ID"

# Register as borrower and investor
stellar contract invoke --id $CONDORPAY_ID --source borrower-1 --network testnet -- register_as_borrower --user borrower-1 --personal_data '"Borrower 1 Data"'
stellar contract invoke --id $CONDORPAY_ID --source investor-1 --network testnet -- register_as_investor --user investor-1

# Create pool
stellar contract invoke --id $CONDORPAY_ID --source condor-admin --network testnet -- create_pool --address condor-admin --xlm_amount 1000000

# Create invoice
stellar contract invoke --id $CONDORPAY_ID --source borrower-1 --network testnet -- create_invoice --creator borrower-1 --amount 50000 --invoice_info '"Invoice 1"' --pool_id 1

# Validate invoice
stellar contract invoke --id $CONDORPAY_ID --source condor-admin --network testnet -- validate_invoice --address condor-admin --invoice_id 1 --validate true

# Investor invests in pool
stellar contract invoke --id $CONDORPAY_ID --source investor-1 --network testnet -- invest_in_pool --user investor-1 --pool_id 1 --xlm_amount 50000

# Claim reward
stellar contract invoke --id $CONDORPAY_ID --source investor-1 --network testnet -- claim_reward --user investor-1 --pool_id 1

# Pay debt
stellar contract invoke --id $CONDORPAY_ID --source borrower-1 --network testnet -- pay_debt --invoice_id 1

# Get functions
stellar contract invoke --id $CONDORPAY_ID --source borrower-1 --network testnet -- get_borrower --user borrower-1
stellar contract invoke --id $CONDORPAY_ID --source investor-1 --network testnet -- get_investor --user investor-1
stellar contract invoke --id $CONDORPAY_ID --source condor-admin --network testnet -- get_pool_balance --pool_id 1
stellar contract invoke --id $CONDORPAY_ID --source condor-admin --network testnet -- get_invoice --invoice_id 1

echo "All CondorPay contract functions executed."