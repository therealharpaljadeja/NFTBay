import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ContextProvider } from './context/Web3Context';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import { keyring } from '@polkadot/ui-keyring';


cryptoWaitReady()
.then(() => {
  keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
  ReactDOM.render(
    <React.StrictMode>
      <Web3ContextProvider>
        <App />
      </Web3ContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );  
})
.catch(console.error)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
