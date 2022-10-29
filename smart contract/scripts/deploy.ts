import hre from 'hardhat';

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory('EtherTransfer');
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log('contract deployed by:', deployer.address);
    console.log('Contract deployed at: ',contract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();