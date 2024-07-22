import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Voting from '../abis/Voting.json';

const ResultsPage = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const loadResults = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const networkId = await web3.eth.net.getId();
      const votingData = Voting.networks[networkId];

      if (votingData) {
        const voting = new web3.eth.Contract(Voting.abi, votingData.address);
        const candidates = await voting.methods.getCandidates().call();
        setCandidates(candidates);
      } else {
        console.error('Voting contract not deployed to detected network.');
      }
    };

    loadResults();
  }, []);

  return (
    <div>
      <h2>Election Results</h2>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>{candidate.name}: {candidate.voteCount} votes</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;