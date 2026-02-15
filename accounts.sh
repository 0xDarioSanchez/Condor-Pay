#!/bin/bash
#set -e

echo "        ********************************"
echo -e "\t***** Creating accounts *****..."
echo "        ********************************"

stellar keys generate condor-admin --network testnet --fund
stellar keys generate investor-1 --network testnet --fund
stellar keys generate investor-2 --network testnet --fund
stellar keys generate investor-3 --network testnet --fund
stellar keys generate pyme-1 --network testnet --fund
stellar keys generate pyme-2 --network testnet --fund
stellar keys generate pyme-3 --network testnet --fund

echo "        *********************************"
echo -e "\t***** Accounts generated *****..."
echo "        *********************************"