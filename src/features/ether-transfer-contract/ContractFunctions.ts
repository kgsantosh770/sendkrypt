import { SEND_ETHER_CONTRACT_ABI, ethereumNotFound, unknownErrorMsg } from '../../utils/Constants';
import { ethereum } from '../../utils/Constants';
import { Contract, ethers } from "ethers";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const CONTRACT_ABI = SEND_ETHER_CONTRACT_ABI;

const getContract = (): Contract => {
    if (!ethereum) throw Error(ethereumNotFound);
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    if (CONTRACT_ADDRESS === undefined) throw Error(unknownErrorMsg);
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

const getAllTransactions = () => {
    const contract = getContract();
    if (!contract) throw Error(unknownErrorMsg);
    const eventFilter = contract.filters.EthTransfer();
    const events = contract.queryFilter(eventFilter);
    return events;
}

const sendEther = async (to: string, amount: number, keyword: string, msg: string) => {
    const weiAmount = ethers.utils.parseEther(amount.toString());
    const contract = getContract();
    const txn = await contract.sendEther(to, keyword, msg, { value: weiAmount });
    await txn.wait();
    return true;
}


export { sendEther, getAllTransactions, getContract };