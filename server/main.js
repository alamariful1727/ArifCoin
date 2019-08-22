const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const parse = require("url-parse");

// Your private key goes here
const myKey = ec.keyFromPrivate(
	"d5a485805ac46ee941a87732f9a05133c27b39545f3cc49b538ad3547005f83f"
);

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic("hex");

// Create new instance of Blockchain class
const savjeeCoin = new Blockchain();

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, "address2", 111);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);

// Mine block
savjeeCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, "address1", 222);
tx2.signTransaction(myKey);
savjeeCoin.addTransaction(tx2);

// Mine block
savjeeCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(
	`Balance of xavier is ${savjeeCoin.getBalanceOfAddress(myWalletAddress)}`
);

// Uncomment this line if you want to test tampering with the chain
// savjeeCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log("Blockchain valid?", savjeeCoin.isChainValid() ? "Yes" : "No");
url = parse("http://arifulalam:4546/blockchain", true);
const node = url.origin;
savjeeCoin.node.add(node);
console.log(savjeeCoin.node);
// savjeeCoin.chain.forEach(b => {
// 	b.transactions.forEach(t => {
// 		console.log(t);
// 	});
// });
