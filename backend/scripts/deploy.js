const Web3 = require('web3');
const compiledContract = require('../build/contracts/Voting.json');

const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledContract.abi)
    .deploy({ data: compiledContract.bytecode, arguments: [["Alice", "Bob", "Charlie"]] })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to', result.options.address);
};

deploy();