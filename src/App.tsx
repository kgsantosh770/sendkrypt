import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import SendEtherForm from "./components/SendEtherForm";
import SendKryptCard from "./components/SendKryptCard";
import TransactionGroup from "./components/TransactionGroup";

function App() {
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
      <TransactionGroup title={"Recent Transactions"} scrollType="horizontal" />
    </div>
  );
}

export default App;
