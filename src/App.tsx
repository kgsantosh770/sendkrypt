import { ethers } from "ethers";
import { useEffect, useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import SendEtherForm from "./components/SendEtherForm";
import SendKryptCard from "./components/SendKryptCard";
import TransactionGroup from "./components/TransactionGroup";
import { getAllTransactions, getContract } from "./features/ether-transfer-contract/ContractFunctions";
import { useWalletContext } from "./features/crypto-wallet/WalletConnect";
import NotificationBar from "./components/NotificationBar";
import { useNotificationContext } from "./features/notification/NotificationContext";

function App() {
  const [allTransactions, setAllTransactions] = useState<ethers.Event[]>([]);
  const [myTransactions, setMyTransactions] = useState<ethers.Event[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [myTransactionsLoading, setMyTransactionsLoading] = useState(false);
  const { accountAddress, isWalletConnected } = useWalletContext();
  const notification = useNotificationContext();

  useEffect(() => {
    loadAllTransactions();
    const contract = getContract();
    if (contract !== false) {
      contract.on('EthTransfer', loadAllTransactions);
    }
  }, [])

  useEffect(() => {
    setMyTransactionsLoading(true);
    const transactions = filterMyTransactions();
    if (transactions.length > 0) {
      setMyTransactions(transactions);
    }
    setMyTransactionsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTransactions, isWalletConnected])

  const loadAllTransactions = () => {
    setTransactionsLoading(true);
    fetchAllTransactions()
      .then((events) => {
        if (events.length > 0) setAllTransactions(events);
      })
      .then(() => setTransactionsLoading(false));
  }

  async function fetchAllTransactions(): Promise<ethers.Event[]> {
    let transactions: ethers.Event[] | boolean = await getAllTransactions();
    if (transactions && transactions.length > 0)
      return transactions.reverse();
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
      <NotificationBar />
      <div className={`text-white px-10 md:px-28 ${notification.enabled ? 'pt-10' : ''}`}>
        <Header className="mb-10" transactionsLength={allTransactions.length}></Header>
        <div className="send-cryptos lg:flex">
          <div className="lg:w-1/2 lg:mr-10">
            <ConnectWallet />
          </div>
          <div className="md:mt-24 lg:mt-0 lg:pl-14 md:w-full lg:w-1/2">
            <SendKryptCard />
            <SendEtherForm />
          </div>
        </div>
        {allTransactions.length > 0 &&
          <TransactionGroup title={"Recent Transactions"} id="recentTransactions" scrollType="horizontal" transactions={allTransactions.slice(0, 15)} loading={transactionsLoading} />
        }
        {isWalletConnected && allTransactions.length > 0 && <TransactionGroup title={"My Transactions"} id="myTransactions" scrollType="vertical" transactions={myTransactions} loading={myTransactionsLoading} />}
        {isWalletConnected && allTransactions.length > 0 && myTransactions.length === 0 && <p className="text-white -mt-20 mb-20 text-lg">You have 0 transactions. Start sending ETH now !</p>}
      </div>
    </>
  );
}

export default App;
