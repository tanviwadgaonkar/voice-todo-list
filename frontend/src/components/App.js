import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import VotingForm from './VotingForm';

const App = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
    };

    loadBlockchainData();
  }, []);

  return (
    <div className="App">
      <h1>Blockchain Voting System</h1>
      <p>Your account: {account}</p>
      <VotingForm />
    </div>
  );
};

export default App;