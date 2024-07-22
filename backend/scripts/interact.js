const Web3 = require('web3');
const compiledContract = require('../build/contracts/Voting.json');

const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(provider);

const address = 'YOUR_CONTRACT_ADDRESS';

const contract = new web3.eth.Contract(compiledContract.abi, address);

const interact = async () => {
  const candidates = await contract.methods.getCandidates().call();
  console.log('Candidates:', candidates);
};

interact();