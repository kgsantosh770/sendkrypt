import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { sendEther } from "../features/ether-transfer-contract/ContractFunctions";
import {useWalletContext} from "../features/crypto-wallet/WalletConnect";

interface IFormData {
  receiver: string,
  amount: string,
  keyword: string,
  msg: string,
}

export default function SendEtherForm() {
  const {isWalletConnected, setTransferInProgress} = useWalletContext();

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
    //form validation
    e.preventDefault();
    const amount = Number(formData.amount);
    setTransferInProgress(true);
    sendEther(formData.receiver, amount, formData.keyword, formData.msg)
      .then(() => setFormData(initialFormData))
      .then(()=> setTransferInProgress(false));
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
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
        className="bg-customblue-100 mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5"
        placeholder="Address to" />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleInputChange}
        max="10000"
        onKeyDown={blockInvalidChar}
        className="bg-[#252849] mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5"
        placeholder="Ether"
      />
      <input
        type="text"
        name="keyword"
        value={formData.keyword}
        onChange={handleInputChange}
        className="bg-customblue-100 mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5"
        placeholder="Keyword"
      />
      <input
        type="text"
        name="msg"
        value={formData.msg}
        onChange={handleInputChange}
        className="bg-customblue-100 mb-5 block w-full shadow-black shadow-sm rounded-lg min-h-max px-5 py-2.5"
        placeholder="Message"
      />
      <hr className="bg-white mx-4 my-3" />
      {isWalletConnected ? <input
        type="submit"
        value="Send"
        onChange={handleInputChange}
        className="bg-customblue-100 cursor-pointer mt-5 w-1/2 block mx-auto border-white border shadow-black shadow-md py-3 px-3 rounded-xl"
      /> : 
      <div className="text-center">Please connect wallet to send ethers</div>}
    </form>
  )
}
