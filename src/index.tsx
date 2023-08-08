import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import { WalletProvider } from './features/crypto-wallet/WalletConnect';
import { NotificationProvider } from './features/notification/NotificationContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </NotificationProvider>
  </React.StrictMode>
);