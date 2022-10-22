import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import SendKryptCard from "./components/SendKryptCard";

function App() {
  return (
    <div className="app text-white text-xl">
      <Header className="mb-28"></Header>
      <div className="px-28">
        <div className="send-cryptos">
          <ConnectWallet />
          <div>
            <SendKryptCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
