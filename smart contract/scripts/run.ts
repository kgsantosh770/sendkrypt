import hre from "hardhat";

const main = async () => {
    const [owner, friend] = await hre.ethers.getSigners(); 
    const contractFactory = await hre.ethers.getContractFactory("EtherTransfer");
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log('contract deployed at: ',(await contract).address);
    console.log('contract owner: ', owner.address);

    console.log("Befor transfer:");
    console.log('My balance: ',await owner.getBalance());
    console.log("Friend balance: ",await friend.getBalance());
    
    console.log("Sending 1 ether to friend");
    const amount = hre.ethers.utils.parseEther("1");
    let txn = await contract.sendEther(friend.address, "Thor", "Simple transfer to a friend.", {value: amount});
    await txn.wait();   
    
    console.log("After transfer:");
    console.log('My balance: ',await owner.getBalance());
    console.log("Friend balance: ",await friend.getBalance());
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