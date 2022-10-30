import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import { WalletProvider } from './features/crypto-wallet/WalletConnect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);