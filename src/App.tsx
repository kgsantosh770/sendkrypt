import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";

function App() {
  return (
    <div className="app text-white text-xl">
      <Header className="mb-28"></Header>
      <div className="px-28">
        <ConnectWallet />
      </div>
    </div>
  );
}

export default App;
