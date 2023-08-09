import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import hre from "hardhat";
import { EtherTransfer, EtherTransfer__factory } from "../typechain-types";

const main = async () => {
    const accounts = await hre.ethers.getSigners(); 
    const owner = accounts[0];
    const contractFactory: EtherTransfer__factory = await hre.ethers.getContractFactory("EtherTransfer");
    const contract: EtherTransfer = await contractFactory.deploy();
    await contract.deployed();

    console.log('');
    console.log('contract deployed at: ',(await contract).address);
    console.log('contract owner: ', owner.address);
    console.log("Owner balance: " + await owner.getBalance());
    console.log('');

    const amount: BigNumber = hre.ethers.utils.parseEther("2");

    //Send money from account 1 to account 2
    await sendEth(contract, accounts[1], accounts[2], amount);
    //Send money from account 2 to account 3
    await sendEth(contract, accounts[2], accounts[3], amount);
    //Send money from account 4 to account 5
    await sendEth(contract, accounts[4], accounts[5], amount);
    //Send money from account 1 to account 2
    await sendEth(contract, accounts[1], accounts[2], amount);
    //Send money from account 2 to account 3
    await sendEth(contract, accounts[2], accounts[3], amount);
    //Send money from account 4 to account 5
    await sendEth(contract, accounts[4], accounts[5], amount);

    //check owner balance
    console.log("\nOwner balance = ", await owner.getBalance());
}

const sendEth =  async(contract: EtherTransfer, sender: SignerWithAddress, receiver: SignerWithAddress, amount: BigNumber) => {
    console.log("Befor transfer:");
    await printBalances(contract, sender, receiver);
    console.log('');

    console.log("Sending ether from " + sender.address + " to " + receiver.address);
    let txn = await contract.connect(sender).sendEther(receiver.address, "Thor", "Simple transfer to a friend.", {value: amount});
    await txn.wait();
    console.log('');

    console.log("After transfer:");
    await printBalances(contract, sender, receiver);
    console.log('');

    console.log('Totoal transactions:');
    console.log(await contract.getTotalTransactions());
    console.log("===========================================================================");
}

const printBalances = async(contract: EtherTransfer, sender: SignerWithAddress, receiver: SignerWithAddress) => {
    console.log(sender.address + ' balance: ',await sender.getBalance());
    console.log(receiver.address + " balance: ",await receiver.getBalance());
    console.log("Contract Balance: ",await contract.getBalance());
    console.log('');
}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();