import { SEND_ETHER_CONTRACT_ABI } from '../../utils/Constants';
import { ethereum } from '../../utils/Constants';
import { ethers } from "ethers";

const CONTRACT_ADDRESS = '0x5CB150e65a803948b297C536c2f1eF229432738f';
const CONTRACT_ABI = SEND_ETHER_CONTRACT_ABI;

const getContract = () => {
    if (!ethereum) return false;
    try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getAllTransactions = () => {
    try {
        const contract = getContract();
        if (!contract) return false;
        const eventFilter = contract.filters.EthTransfer();
        const events = contract.queryFilter(eventFilter);
        return events;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const sendEther = async (to: string, amount: number, keyword: string, msg: string) => {
    const weiAmount = ethers.utils.parseEther(amount.toString());
    try {
        const contract = getContract();
        if (!contract) return false;
        const txn = await contract.sendEther(to, keyword, msg, { value: weiAmount });
        await txn.wait();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export { sendEther, getAllTransactions };