import sendEtherJson from './SendEther.json';
declare var window: IEthWindow;

interface IEthWindow extends Window {
    ethereum: any,
}

export const {ethereum} = window;
export const  SEND_ETHER_CONTRACT_ABI = sendEtherJson.abi;