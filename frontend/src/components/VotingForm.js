import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Voting from '../abis/Voting.json';

const VotingForm = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');

  useEffect(() => {
    const loadCandidates = async () => {
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

    loadCandidates();
  }, []);

  const handleVote = async (candidateIndex) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.requestAccounts();
    const networkId = await web3.eth.net.getId();
    const votingData = Voting.networks[networkId];

    if (votingData) {
      const voting = new web3.eth.Contract(Voting.abi, votingData.address);
      await voting.methods.vote(candidateIndex).send({ from: accounts[0] });
      alert('Vote casted successfully!');
    } else {
      console.error('Voting contract not deployed to detected network.');
    }
  };

  return (
    <div>
      <h2>Vote for your favorite candidate</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleVote(selectedCandidate); }}>
        <select value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}>
          {candidates.map((candidate, index) => (
            <option key={index} value={index}>{candidate.name}</option>
          ))}
        </select>
        <button type="submit">Vote</button>
      </form>
    </div>
  );
};

export default VotingForm;