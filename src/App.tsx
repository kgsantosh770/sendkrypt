import { ethers } from "ethers";
import { useEffect, useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import SendEtherForm from "./components/SendEtherForm";
import SendKryptCard from "./components/SendKryptCard";
import TransactionGroup from "./components/TransactionGroup";
import { getAllTransactions } from "./features/ether-transfer-contract/ContractFunctions";
import { useWalletContext } from "./features/crypto-wallet/WalletConnect";

function App() {
  const [allTransactions, setAllTransactions] = useState<ethers.Event[]>([]);
  const [myTransactions, setMyTransactions] = useState<ethers.Event[]>([]);
  const { accountAddress } = useWalletContext();

  useEffect(() => {
    fetchAllTransactions()
      .then((events) => {
        if (events.length > 0) setAllTransactions(events);
      })
    const transactions = filterMyTransactions();
    if (transactions.length > 0) {
      setMyTransactions(transactions);
    }
  }, [])

  async function fetchAllTransactions(): Promise<ethers.Event[]> {
    let transactions: ethers.Event[] | boolean = await getAllTransactions();
    if (transactions && transactions.length > 0)
      return transactions;
    else
      return [];
  }

  function filterMyTransactions(): ethers.Event[] {
    allTransactions?.filter((transaction: ethers.Event) => {
      if (transaction.args && transaction.args[0] && transaction.args[0].from === accountAddress) {
        return transaction;
      }
    });
    return [];
  }

  return (
    <div className="app text-white px-10 md:px-28">
      <Header className="mb-16"></Header>
      <div className="send-cryptos lg:flex">
        <div className="lg:w-1/2 lg:mr-10">
          <ConnectWallet />
        </div>
        <div className="md:mt-24 lg:mt-0 lg:pl-14 md:w-full lg:w-1/2">
          <SendKryptCard />
          <SendEtherForm />
        </div>
      </div>
      <TransactionGroup title={"Recent Transactions"} scrollType="horizontal" transactions={allTransactions} />
      <TransactionGroup title={"My Transactions"} scrollType="vertical" transactions={myTransactions} />
    </div>
  );
}

export default App;
