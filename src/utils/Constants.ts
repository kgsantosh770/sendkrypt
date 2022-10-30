declare var window: IEthWindow;

interface IEthWindow extends Window {
    ethereum: any,
}

export const {ethereum} = window;