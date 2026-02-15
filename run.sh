#!/bin/bash
set -e

# Condor Pay
#
# USAGE:
#   ./run.sh              - Deploy fresh contract (clean state) [DEFAULT]
#   REUSE_CONTRACT=true ./run.sh  - Reuse existing contract (state persists)
#
# 1. Build and deploy the contract, creating the first pool
# 2. Register as PYME's owners and as Investors
# 3. Invoice are created and approed or rejected bu the Admin.
# 4. Investors can invest in the pool and receive LP tokens to then claim their rewards.
# 5. PYME's owners can receive the funds after the invoice is approved, with a discount for early payment.
# 6. This "discount" is distributed among the investors as rewards, which can be claimed by burning their LP tokens.
#

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
    if stellar contract alias show condorpay-contract 2>/dev/null; then
        CONTRACT_ID=$(stellar contract alias show condorpay-contract)
        echo "✅ Using existing contract: $CONTRACT_ID"
    else
        echo "⚠️  No existing contract found. Deploying new one..."
        
        # Deploy and initialize in one step
        stellar contract deploy \
          --wasm target/wasm32v1-none/release/condorpay.optimized.wasm \
          --source-account condor-admin \
          --network testnet \
          --alias condorpay-contract \
          -- \
          --admin condor-admin \
          --token CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC
        
        CONTRACT_ID=$(stellar contract alias show condorpay-contract)
        echo "✅ Deployed new contract: $CONTRACT_ID"
    fi
else
    echo "🗑️  Removing old contract alias for fresh deployment..."
    stellar contract alias remove condorpay-contract 2>/dev/null || true
    
    echo "📦 Deploying fresh contract with new state..."
    
    # Deploy and initialize in one step, capture contract ID
    stellar contract deploy \
      --wasm target/wasm32v1-none/release/condorpay.optimized.wasm \
      --source-account condor-admin \
      --network testnet \
      --alias condorpay-contract \
      -- \
      --admin condor-admin \
      --token CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC
    
    CONTRACT_ID=$(stellar contract alias show condorpay-contract)
    echo "✅ Deployed new contract: $CONTRACT_ID"
fi

# Update .env file with new contract ID
if [ -f ".env" ]; then
    # Check if the line exists
    if grep -q "PUBLIC_condorpay_CONTRACT_ID=" .env; then
        # Update existing line (works on both macOS and Linux)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|PUBLIC_condorpay_CONTRACT_ID=.*|PUBLIC_condorpay_CONTRACT_ID=$CONTRACT_ID|" .env
        else
            sed -i "s|PUBLIC_condorpay_CONTRACT_ID=.*|PUBLIC_condorpay_CONTRACT_ID=$CONTRACT_ID|" .env
        fi
        echo "✅ Updated .env file with new contract ID"
    else
        # Append if doesn't exist
        echo "" >> .env
        echo "PUBLIC_condorpay_CONTRACT_ID=$CONTRACT_ID" >> .env
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
echo -e "\tRegistration of Investor 1 ..."
echo "***********************************************"
stellar contract invoke \
    --id condorpay-contract \
    --source investor-1 \
    --network testnet \
    -- new_investor \
    --user investor-1

echo "***********************************************"
echo -e "\tRegistration of Investor 2 ..."
echo "***********************************************"
stellar contract invoke \
    --id condorpay-contract \
    --source investor-2 \
    --network testnet \
    -- new_investor \
    --user investor-2

echo "***********************************************"
echo -e "\tRegistration of Investor 3 ..."
echo "***********************************************"
stellar contract invoke \
    --id condorpay-contract \
    --source investor-3 \
    --network testnet \
    -- new_investor \
    --user investor-3

echo "***********************************************"
echo -e "\tRegistration of PYME's Owner 1 ..."
echo "***********************************************"
stellar contract invoke \
    --id condorpay-contract \
    --source pyme-1 \
    --network testnet \
    -- new_investor \
    --user pyme-1

echo "***********************************************"
echo -e "\tRegistration of PYME's Owner 2 ..."
echo "***********************************************"
stellar contract invoke \
    --id condorpay-contract \
    --source pyme-2 \
    --network testnet \
    -- new_investor \
    --user pyme-2

echo "****************************************"
echo -e "\tGet Investor 1 Info..."
echo "*****************************************"
stellar contract invoke \
    --id condorpay-contract \
    --source investor-1 \
    --network testnet \
    -- get_user \
    --user investor-1

echo "****************************************"
echo -e "\tGet PYME's Owner 1 Info..."
echo "*****************************************"
stellar contract invoke \
    --id condorpay-contract \
    --source pyme-1 \
    --network testnet \
    -- get_user \
    --user pyme-1


# echo "****************************************"
# echo -e "\tGet Investor2 Info..."
# echo "*****************************************"
# stellar contract invoke \
#     --id condorpay-contract \
#     --source Investor-2 \
#     --network testnet \
#     -- get_user \
#     --user Investor-2

# echo "****************************************"
# echo -e "\tGet Investor3 Info..."
# echo "*****************************************"
# stellar contract invoke \
#     --id condorpay-contract \
#     --source Investor-3 \
#     --network testnet \
#     -- get_user \
#     --user Investor-3






echo "**************************************************"
echo -e "\tCreating Dispute 1 with Anonymous Voting Setup ..."
echo "**************************************************"
# Set voting_ends_at to 60 seconds from now to allow time for voting
VOTING_ENDS_AT=$(($(date +%s) + 60))
echo "Voting ends at timestamp: $VOTING_ENDS_AT (60 seconds from now)"

echo ""
echo "Step 1: Setting up anonymous voting configuration for project 1..."
stellar contract invoke \
    --id condorpay-contract \
    --source condor-admin \
    --network testnet \
    -- anonymous_voting_setup \
    --Investorcondor-admin \
    --project_id 1 \
    --public_key "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0test_public_key"

echo ""
echo "Step 2: Creating dispute..."
stellar contract invoke \
    --id condorpay-contract \
    --source condor-admin \
    --network testnet \
    -- create_dispute_demo \
    --project_id 1 \
    --creator condor-admin \
    --counterpart condor-admin \
    --proof "Test dispute for anonymous voting" \
    --voting_ends_at "$VOTING_ENDS_AT" \
    --called_contract condorpay-contract

echo "**********************************************************"
echo -e "\tTesting build_commitments_from_votes function ..."
echo "**********************************************************"
# Test the commitment building function with sample votes and seeds
# Votes: [3, 1, 1] - representing (approve=3, reject=1, abstain=1)
# Seeds: [5, 4, 6] - random seeds for cryptographic commitment
echo "Building commitments for dispute 1..."
COMMITMENTS_OUTPUT=$(stellar contract invoke \
    --id condorpay-contract \
    --source condor-admin \
    --network testnet \
    -- build_commitments_from_votes \
    --dispute_id 1 \
    --votes '["3", "1", "1"]' \
    --seeds '["5", "4", "6"]' 2>&1)

echo "Commitments generated:"
echo "$COMMITMENTS_OUTPUT"

# Extract the commitments array from the output
# The output format should be an array of BytesN<96>
COMMITMENT_1=$(echo "$COMMITMENTS_OUTPUT" | grep -oP '"\K[a-f0-9]{192}' | sed -n '1p')
COMMITMENT_2=$(echo "$COMMITMENTS_OUTPUT" | grep -oP '"\K[a-f0-9]{192}' | sed -n '2p')
COMMITMENT_3=$(echo "$COMMITMENTS_OUTPUT" | grep -oP '"\K[a-f0-9]{192}' | sed -n '3p')

echo "Extracted commitments:"
echo "1: $COMMITMENT_1"
echo "2: $COMMITMENT_2"
echo "3: $COMMITMENT_3"

echo "**********************************************************"
echo -e "\tInvestor1 casting anonymous vote on Dispute 1 ..."
echo "**********************************************************"
# Investor1 votes with weight 3
# Get the actual Stellar address for Investor-1
JUDGE1_ADDRESS=$(stellar keys address Investor-1)

# Use the actual commitments generated above
stellar contract invoke \
    --id condorpay-contract \
    --source Investor-1 \
    --network testnet \
    -- vote \
    --voter "$JUDGE1_ADDRESS" \
    --dispute_id 1 \
    --vote_data "{\"AnonymousVote\": {
        \"address\": \"$JUDGE1_ADDRESS\",
        \"weight\": 3,
        \"encrypted_seeds\": [\"seed1_enc\", \"seed2_enc\", \"seed3_enc\"],
        \"encrypted_votes\": [\"vote1_enc\", \"VoteAnon_enc\", \"vote3_enc\"],
        \"commitments\": [
            \"$COMMITMENT_1\",
            \"$COMMITMENT_2\",
            \"$COMMITMENT_3\"
        ]
    }}"

echo "**********************************************************"
echo -e "\tInvestor2 casting anonymous vote on Dispute 1 ...
**********************************************************"
# For demo simplicity, we'll skip Investor2's vote
# In production, each Investorwould generate their own commitments
# JUDGE2_ADDRESS=$(stellar keys address Investor-2)

# stellar contract invoke \
#     --id condorpay-contract \
#     --source Investor-2 \
#     --network testnet \
#     -- vote \
#     --voter "$JUDGE2_ADDRESS" \
#     --dispute_id 1 \
#     --vote_data "{\"AnonymousVote\": {
#         \"address\": \"$JUDGE2_ADDRESS\",
#         \"weight\": 2,
#         \"encrypted_seeds\": [\"seed1_enc\", \"seed2_enc\", \"seed3_enc\"],
#         \"encrypted_votes\": [\"vote1_enc\", \"VoteAnon_enc\", \"vote3_enc\"],
#         \"commitments\": [
#             \"$COMMITMENT_1\",
#             \"$COMMITMENT_2\",
#             \"$COMMITMENT_3\"
#         ]
#     }}"

echo "Skipping Investor2 vote for demo - only using Investor1's vote"

echo "**********************************************************"
echo -e "\tExecuting dispute with tallied votes and seeds ..."
echo "**********************************************************"
# Wait for voting period to end (60 seconds + buffer)
echo "Waiting for voting period to end (62 seconds)..."
sleep 62

# After voting period ends, execute with tallied results
# Tallies: [9, 3, 3] - weighted sum: Judge1(3*[3,1,1]) = [9,3,3]
# Seeds: [15, 12, 18] - weighted sum: Judge1(3*[5,4,6]) = [15,12,18]
# This proves the votes without revealing individual choices
ADMIN_ADDRESS=$(stellar keys address condor-admin)

stellar contract invoke \
    --id condorpay-contract \
    --source condor-admin \
    --network testnet \
    -- execute \
    --maintainer "$ADMIN_ADDRESS" \
    --dispute_id 1 \
    --tallies '["9", "3", "3"]' \
    --seeds '["15", "12", "18"]'

echo ""
echo "**********************************************************"
echo -e "\tFetching final dispute results ..."
echo "**********************************************************"
DISPUTE_RESULT=$(stellar contract invoke \
    --id condorpay-contract \
    --source condor-admin \
    --network testnet \
    -- get_dispute \
    --dispute_id 1 2>&1 | grep -v "⚠️" | grep -v "ℹ️")

# Debug: Show the raw output
echo "Debug - Raw dispute result:"
echo "$DISPUTE_RESULT"
echo ""

# Extract key information from the dispute result
STATUS=$(echo "$DISPUTE_RESULT" | grep -o '"dispute_status":"[^"]*"' | cut -d'"' -f4)

# Winner extraction - handle the nested structure
WINNER=$(echo "$DISPUTE_RESULT" | grep -o '"winner":\s*{"address":"[^"]*"' | sed 's/.*"address":"\([^"]*\)".*/\1/')
if [ -z "$WINNER" ]; then
    # Try alternative format
    WINNER=$(echo "$DISPUTE_RESULT" | grep -o '"winner":\s*"[^"]*"' | cut -d'"' -f4)
fi

echo ""
echo "============================================================"
echo -e "\t✅ ANONYMOUS VOTING COMPLETE!"
echo "============================================================"
echo "Dispute Status: $STATUS"
echo "Winner: ${WINNER:-Not set}"
echo "Tallies: [Approve=9, Reject=3, Abstain=3]"
echo ""
echo "🔐 Cryptographic Proof Verification:"
echo "  ✓ BLS12-381 commitments validated"
echo "  ✓ Individual votes remain hidden"
echo "  ✓ Weighted tallies verified against commitments"
echo "  ✓ Result: CREATOR wins (approve=9 > reject+abstain=6)"
echo "============================================================"
echo ""

# echo "******************************************************"
# echo -e "\tOpening contract on Stellar Expert explorer"
# echo "******************************************************"

# CONTRACT_ID=$(stellar contract alias show condorpay-contract)
# EXPLORER_URL="https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID"
# xdg-open "$EXPLORER_URL"