import sendEtherJson from './SendEther.json';
declare var window: IEthWindow;

interface IEthWindow extends Window {
    ethereum: any,
}

export const {ethereum} = window;
export const SEND_ETHER_CONTRACT_ABI = sendEtherJson.abi;

// messages
export const ethereumNotFound = "Please install Metamask";
export const unknownErrorMsg = "Something went wrong! Please try again later."