import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { sendEther } from "../features/ether-transfer-contract/ContractFunctions";
import { useWalletContext } from "../features/crypto-wallet/WalletConnect";
import {ethers} from "ethers"

interface IFormData {
  receiver: string,
  amount: string,
  keyword: string,
  msg: string,
}

export default function SendEtherForm() {
  const { isWalletConnected, transferInProgress, setTransferInProgress } = useWalletContext();
  const [formError, setFormError] = useState('');

  const initialFormData = {
    receiver: '',
    amount: '',
    keyword: '',
    msg: '',
  }
  const [formData, setFormData] = useState<IFormData>(initialFormData);

  const blockInvalidChar = (e: KeyboardEvent) =>
    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!isFormValid())
      return;
    if (transferInProgress) return;
    const amount = Number(formData.amount);
    setTransferInProgress(true);
    sendEther(formData.receiver, amount, formData.keyword, formData.msg)
    .then((result: any) => {
      if(result !== true){
        const msg = result.message as string;
        let index = msg.indexOf("[");
        if(index === -1)
          index = msg.indexOf('(');
        var errorMessage = msg.toUpperCase().charAt(0) + msg.substring(1, index-1) + '.';
        setFormError(errorMessage);
      }
      else
        setFormError('');
    })
    .then(() => setFormData(initialFormData))
    .then(() => setTransferInProgress(false))
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "keyword" && !isKeywordValid()) {
      return;
    }
    if(name === "message" && !isMessageValid()){
      return;
    }
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const isFormValid = () => {
    if (isRecieverAddressValid() && isEthAmountValid() && isKeywordValid() && isMessageValid())
      return true;
    return false;
  }

  const isRecieverAddressValid = () => {
    if(ethers.utils.isAddress(formData.receiver)){
      return true;
    }
    setFormError("Wallet address invalid.");
    return false;
  }

  const isEthAmountValid = () => {
    try {
      const ethAmount = Number.parseFloat(formData.amount);
      if(ethAmount <= 10000 && ethAmount > 0)
        return true;
      else{
        setFormError("Eth amount should be between 1 and 10000.");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const isKeywordValid = () => {
    if (formData.keyword.length <= 20)
      return true;
    return false;
  }

  const isMessageValid = () => {
    if (formData.msg.length <= 100)
      return true;
    return false;
  }

  return (
    <form
      className="mt-6 mb-16 lg:my-6 bg-customblue-200 py-6 px-4 rounded-2xl max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="receiver"
        value={formData.receiver}
        onChange={handleInputChange}
        disabled={transferInProgress}
        className="bg-customblue-100 mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5"
        placeholder="Address to" />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleInputChange}
        disabled={transferInProgress}
        max="10000"
        onKeyDown={blockInvalidChar}
        className="bg-[#252849] mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5"
        placeholder="Ether"
      />
      <input
        type="text"
        name="keyword"
        maxLength={20}
        value={formData.keyword}
        onChange={handleInputChange}
        disabled={transferInProgress}
        className="bg-customblue-100 mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5"
        placeholder="Keyword"
      />
      <input
        type="text"
        name="msg"
        maxLength={100}
        value={formData.msg}
        onChange={handleInputChange}
        disabled={transferInProgress}
        className="bg-customblue-100 mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5"
        placeholder="Message"
      />
      <hr className="bg-white mx-4 my-3" />
      {isWalletConnected ? <input
        type="submit"
        value={transferInProgress ? "Sending" : "Send"}
        disabled={transferInProgress ? true : false}
        className={`${transferInProgress ? 'cursor-auto' : 'cursor-pointer'} bg-customblue-100 mt-5 w-1/2 block mx-auto border-white border shadow-black shadow-md py-3 px-3 rounded-xl`}
      /> :
        <div className="text-center">Please connect wallet to send ethers</div>}
      {
        formError !== '' && 
        <div className="text-center text-red-600 font-bold mt-4">{formError}</div>
      }
    </form>
  )
}
