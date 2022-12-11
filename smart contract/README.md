# EtherTransfer Contract
Ethereum smart contract having the basic use case of transfering eth from one crypto account to another. Besides the basic functionality this contract also has other exciting features

## Features
1. Transfer eth.
2. Acquire transaction fee.
3. Give a prize amount to every 20th transaction.
4. Retrieve the amount stored in smart contract.
5. Calculate total number of transactions.

## Hardhat commands
1. To test the smart contract run the file `run.ts` using the following command.
> npx hardhat run scripts/run.ts
2. To deploy smart contract to goerli test network.
> npx hardhat run scripts/deploy.ts --network goerli