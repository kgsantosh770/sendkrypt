import { ethers } from "ethers";
import { useEffect, useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import SendEtherForm from "./components/SendEtherForm";
import SendKryptCard from "./components/SendKryptCard";
import TransactionGroup from "./components/TransactionGroup";
import { getAllTransactions } from "./features/ether-transfer-contract/ContractFunctions";
import { useWalletContext } from "./features/crypto-wallet/WalletConnect";
import NotificationBar from "./components/NotificationBar";

function App() {
  const [allTransactions, setAllTransactions] = useState<ethers.Event[]>([]);
  const [myTransactions, setMyTransactions] = useState<ethers.Event[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [myTransactionsLoading, setMyTransactionsLoading] = useState(false);
  const { accountAddress, isWalletConnected, transferInProgress } = useWalletContext();

  useEffect(() => {
    setTransactionsLoading(true);
    fetchAllTransactions()
      .then((events) => {
        if (events.length > 0) setAllTransactions(events);
      })
      .then(() => setTransactionsLoading(false));
  }, [])

  useEffect(() => {
    setMyTransactionsLoading(true);
    const transactions = filterMyTransactions();
    if (transactions.length > 0) {
      setMyTransactions(transactions);
    }
    setMyTransactionsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTransactions])

  async function fetchAllTransactions(): Promise<ethers.Event[]> {
    let transactions: ethers.Event[] | boolean = await getAllTransactions();
    if (transactions && transactions.length > 0)
      return transactions;
    else
      return [];
  }

  function filterMyTransactions(): ethers.Event[] {
    const transactions = allTransactions?.filter((transaction: ethers.Event) => {
      if (transaction.args && transaction.args[0] && transaction.args[0].from.toLowerCase() === accountAddress) {
        return transaction;
      }
      return null;
    });
    return transactions;
  }

  return (
    <>
      <NotificationBar message="Ether transfer in progress !" showNotification={transferInProgress}/>
      <div className={`text-white px-10 md:px-28 ${transferInProgress ? 'pt-10' : ''}`}>
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
        <TransactionGroup title={"Recent Transactions"} id="recentTransactions" scrollType="horizontal" transactions={allTransactions} loading={transactionsLoading}/>
        {isWalletConnected && <TransactionGroup title={"My Transactions"} id="myTransactions" scrollType="vertical" transactions={myTransactions} loading={myTransactionsLoading}/>}
      </div>
    </>
  );
}

export default App;
