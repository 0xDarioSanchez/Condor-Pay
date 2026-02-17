#!/bin/bash
#set -e

echo "***************************"
echo -e "\t*****Building*****..."
echo "***************************"
cargo build --target wasm32v1-none --release && stellar contract optimize --wasm target/wasm32v1-none/release/baf_crowdfunding_contract.wasm

echo "*********************"
echo -e "\tDeploying ..."
echo "*********************"
stellar contract deploy \
    --wasm target/wasm32v1-none/release/baf_crowdfunding_contract.optimized.wasm \
    --alias contract_address \
    --source admin \
    --network testnet \
    -- \
    --admin GBLXUFE47B724YH66XIRPXEFMXDGWZCIM7H4F3OM6JSPDOXO3QPP7JTW \
    --token CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC \
    --minimum_donation 10000000

echo "**************************************"
echo -e "\tCreation of the Delta del Trige NGO ..."
echo "**************************************"
stellar contract invoke \
    --id contract_address \
    --source admin \
    --network testnet \
    -- create_ong \
    --ong GAB3GGZD77VPZDXKF33SDPETZEBCY3ATPAPQBCDK42MGDDFHCHSTT7EZ

echo "**************************************"
echo -e "\tCreation of the Water Forests NGO ..."
echo "**************************************"
stellar contract invoke \
    --id contract_address \
    --source admin \
    --network testnet \
    -- create_ong \
    --ong GDVC5X7T4HKW42TAF7CTYH4I4WS4UJPNDVGOLCH2LWOIAMZ5C5V6JIEI

echo "*****************************************"
echo -e "\tLaunch of the High Peaks Reforestation campaign for the Water Forests NGO ..."
echo "*****************************************"
stellar contract invoke \
    --id contract_address \
    --source alice-ong-1 \
    --network testnet \
    -- create_campaign \
    --creator GAB3GGZD77VPZDXKF33SDPETZEBCY3ATPAPQBCDK42MGDDFHCHSTT7EZ \
    --beneficiary GBYO36NUZL4RE4INJ6726IETX7FR5BJTX6PWJL7XWWRJOZD2XNMHGPQV \
    --goal 100000000 \
    --min_donation 100000

echo "*****************************************"
echo -e "\tLaunch of the Solar Panels campaign for the Delta de Trige NGO ..."
echo "*****************************************"
stellar contract invoke \
    --id contract_address \
    --source alice-ong-2 \
    --network testnet \
    -- create_campaign \
    --creator GDVC5X7T4HKW42TAF7CTYH4I4WS4UJPNDVGOLCH2LWOIAMZ5C5V6JIEI \
    --beneficiary GBQDY66S67DAGZMGIWXHDK2AYKAAQD7HJV3H6HAB4T4KPUWBMKXT65Y4 \
    --goal 100000000 \
    --min_donation 100000


echo "*****************************************"
echo -e "\tLaunch another of the Solar Panels campaign for the Delta de Trige NGO ..."
echo "*****************************************"
stellar contract invoke \
    --id contract_address \
    --source alice-ong-2 \
    --network testnet \
    -- create_campaign \
    --creator GDVC5X7T4HKW42TAF7CTYH4I4WS4UJPNDVGOLCH2LWOIAMZ5C5V6JIEI \
    --beneficiary GC3GWMVITNHCT6LS4URAGGUUUMH47BVMZ5VMSRZPCG6GVDT66M23JAEJ \
    --goal 100000000 \
    --min_donation 100000

echo "**********************************************"
echo -e "\tContribution to the Solar Panels campaign for the Delta de Tigre NGO  ..."
echo "**********************************************"
stellar contract invoke \
    --id contract_address \
    --source alice-contributor \
    --network testnet \
    -- contribute \
    --contributor GDJRDOD6EV2X4NF4SNL4I7VHUH3L7NNDYQRHGJZPV4JII7CFN4XG3DAP \
    --campaign_id GBYO36NUZL4RE4INJ6726IETX7FR5BJTX6PWJL7XWWRJOZD2XNMHGPQV \
    --amount 10000000

echo "****************************************************"
echo -e "\tAnother contribution to the Solar Panels campaign for the Water Forests NGO ..."
echo "****************************************************"
stellar contract invoke \
    --id contract_address \
    --source alice-contributor \
    --network testnet \
    -- contribute \
    --contributor GDJRDOD6EV2X4NF4SNL4I7VHUH3L7NNDYQRHGJZPV4JII7CFN4XG3DAP \
    --campaign_id GBYO36NUZL4RE4INJ6726IETX7FR5BJTX6PWJL7XWWRJOZD2XNMHGPQV \
    --amount 20000000

echo "**********************************************"
echo -e "\tContribution to the "Reforestación Altas Cumbres" campaign for the Water Forests NGO ..."
echo "**********************************************"
stellar contract invoke \
    --id contract_address \
    --source alice-contributor \
    --network testnet \
    -- contribute \
    --contributor GDJRDOD6EV2X4NF4SNL4I7VHUH3L7NNDYQRHGJZPV4JII7CFN4XG3DAP \
    --campaign_id GBQDY66S67DAGZMGIWXHDK2AYKAAQD7HJV3H6HAB4T4KPUWBMKXT65Y4 \
    --amount 100000000


echo "****************************************************************"
echo -e "\tWithdrawing for Delta de Tigre NGO campaign => Goal NOT reached ..."
echo "****************************************************************"
stellar contract invoke \
    --id contract_address \
    --source alice-beneficiary-1 \
    --network testnet \
    -- withdraw \
    --campaign_id GBYO36NUZL4RE4INJ6726IETX7FR5BJTX6PWJL7XWWRJOZD2XNMHGPQV

echo "*************************************************************"
echo -e "\tWithdrawing for Water Forests NGO campaign => Goal reached ..."
echo "*************************************************************"
stellar contract invoke \
    --id contract_address \
    --source alice-beneficiary-2 \
    --network testnet \
    -- withdraw \
    --campaign_id GBQDY66S67DAGZMGIWXHDK2AYKAAQD7HJV3H6HAB4T4KPUWBMKXT65Y4

echo "**********************************************"
echo -e "\tRefunding for Delta de Tigre NGO campaign ..."
echo "**********************************************"
stellar contract invoke \
    --id contract_address \
    --source alice-contributor \
    --network testnet \
    -- refund \
    --contributor GDJRDOD6EV2X4NF4SNL4I7VHUH3L7NNDYQRHGJZPV4JII7CFN4XG3DAP \
    --campaign_id GBYO36NUZL4RE4INJ6726IETX7FR5BJTX6PWJL7XWWRJOZD2XNMHGPQV


echo "******************************************************"
echo -e "\tOpening contract on Steller Expert explorer"
echo "******************************************************"

CONTRACT_ID=$(stellar contract alias show contract_address)
EXPLORER_URL="https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID"
xdg-open "$EXPLORER_URL"