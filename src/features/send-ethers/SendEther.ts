import { abi } from "./abi.json";
import { ethereum } from '../../utils/Constants';
import { ethers } from "ethers";

const CONTRACT_ADDRESS = '0x5CB150e65a803948b297C536c2f1eF229432738f';
const CONTRACT_ABI = abi;

const getContract = () => {
    if (!ethereum) return false;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

const sendEther = async (to: string, keyword: string, msg: string) => {
    try {
        const contract = getContract();
        if (!contract) return false;
        const txn = await contract.sendEther(to, keyword, msg);
        await txn.wait();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default sendEther;