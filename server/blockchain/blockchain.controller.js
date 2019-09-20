const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { Blockchain, Transaction } = require('./index');

// Create new blockchain
const arifCoin = new Blockchain();

// get public & private keys
const getKeys = (req, res) => {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');

  return res.status(200).json({
    messages: 'New keys generated!!',
    publicKey,
    privateKey,
  });
};

// create transaction
const newTransaction = (req, res) => {
  // from = sender's private key
  const senderKey = ec.keyFromPrivate(req.body.from);
  const senderWalletAddress = senderKey.getPublic('hex');

  // to = receiver's public key
  const receiverWalletAddress = req.body.to;
  const amount = req.body.amount;

  // check sender's wallet
  const currentBalance = arifCoin.getBalanceOfAddress(
    senderWalletAddress,
  );
  if (currentBalance < amount) {
    return res.status(400).json({
      messages: `Insufficient balance, sorry`,
      currentBalance,
    });
  }

  const t = new Transaction(
    senderWalletAddress,
    receiverWalletAddress,
    amount,
  );

  t.signTransaction(senderKey);
  arifCoin.addTransaction(t);

  return res.status(200).json({
    messages: `Transaction will be added to Block ${arifCoin.chain
      .length + 1}`,
  });
};

// miner mine new block
const mine = (req, res) => {
  if (arifCoin.pendingTransactions.length === 0) {
    return res.status(200).json({
      messages: `Nothing to mine, thank you.`,
    });
  }

  // privateKey = miner's private key
  const minerKey = ec.keyFromPrivate(req.body.privateKey);
  const minerWalletAddress = minerKey.getPublic('hex');

  arifCoin.minePendingTransactions(minerWalletAddress);
  const latestBlock = arifCoin.getLatestBlock();
  return res.status(200).json({
    messages: `Block ${arifCoin.chain.length} mined successfully.`,
    latestBlock,
  });
};

// get balance of list of users
const getBalance = (req, res) => {
  const users = req.body.users;
  let balances = {};
  users.forEach(user => {
    balances[user] = arifCoin.getBalanceOfAddress(user);
  });

  return res.status(200).json({
    messages: `Balance of all users`,
    balances,
  });
};

// recharge a account
const recharge = (req, res) => {
  const { to, amount } = req.body;

  arifCoin.recharge(to, amount);

  return res.status(200).json({
    messages: `New recharge occurred`,
    account: to,
    amount,
  });
};

// register a node
const registerNode = (req, res) => {
  let nodes = req.body.nodes;
  nodes.forEach(node => {
    arifCoin.registerNode(node);
  });
  return res.status(200).json({
    messages: `New node register`,
    nodes: arifCoin.getNodes(),
  });
};

// get full chain
const getFullChain = (req, res) => {
  return res.status(200).json({
    messages: `ArifCoin's Blockchain.`,
    length: arifCoin.getFullChain().length,
    blockchain: arifCoin.getFullChain(),
  });
};

// resolve conflicts
const resolve = async (req, res) => {
  if (arifCoin.getNodes().length == 0) {
    response = {
      message: 'No node available',
    };
  } else {
    let status = await arifCoin.resolveConflicts();
    console.log(status);
    if (status) {
      response = {
        message: 'Our chain was replaced',
      };
    } else {
      response = {
        message: 'Our chain is authoritative',
      };
    }
  }
  return res.status(200).json(response);
};

module.exports = {
  getKeys,
  newTransaction,
  mine,
  getBalance,
  recharge,
  registerNode,
  getFullChain,
  resolve,
};
