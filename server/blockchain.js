const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const parse = require("url-parse");
const axios = require("axios");
class Transaction {
	/**
	 * @param {string} fromAddress
	 * @param {string} toAddress
	 * @param {number} amount
	 */
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
		this.timestamp = Date.now();
	}

	/**
	 * Creates a SHA256 hash of the transaction
	 *
	 * @returns {string}
	 */
	calculateHash() {
		return SHA256(
			this.fromAddress + this.toAddress + this.amount + this.timestamp
		).toString();
	}

	/**
	 * Signs a transaction with the given signingKey (which is an Elliptic key-pair
	 * object that contains a private key). The signature is then stored inside the
	 * transaction object and later stored on the blockchain.
	 *
	 * @param {string} signingKey
	 */
	signTransaction(signingKey) {
		// You can only send a transaction from the wallet that is linked to your
		// key. So here we check if the fromAddress matches your publicKey
		if (signingKey.getPublic("hex") !== this.fromAddress) {
			throw new Error("You cannot sign transactions for other wallets!");
		}

		// Calculate the hash of this transaction, sign it with the key
		// and store it inside the transaction object
		const hashTx = this.calculateHash();
		const sig = signingKey.sign(hashTx, "base64");

		this.signature = sig.toDER("hex");
	}

	/**
	 * Checks if the signature is valid (transaction has not been tampered with).
	 * It uses the fromAddress as the public key.
	 *
	 * @returns {boolean}
	 */
	isValid() {
		// If the transaction doesn't have a from address we assume it's a
		// mining reward and that it's valid. You could verify this in a
		// different way (special field for instance)
		if (this.fromAddress === "ArifCoin") return true;

		if (!this.signature || this.signature.length === 0) {
			throw new Error("No signature in this transaction");
		}

		const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
		return publicKey.verify(this.calculateHash(), this.signature);
	}
}

class Block {
	/**
	 * @param {number} timestamp
	 * @param {Transaction[]} transactions
	 * @param {string} previousHash
	 */
	constructor(timestamp, transactions, previousHash = "") {
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.nonce = 0;
		this.hash = this.calculateHash();
	}

	/**
	 * Returns the SHA256 of this block (by processing all the data stored
	 * inside this block)
	 *
	 * @returns {string}
	 */
	calculateHash() {
		return SHA256(
			this.previousHash +
				this.timestamp +
				JSON.stringify(this.transactions) +
				this.nonce
		).toString();
	}

	/**
	 * Starts the mining process on the block. It changes the 'nonce' until the hash
	 * of the block starts with enough zeros (= difficulty)
	 *
	 * @param {number} difficulty
	 */
	mineBlock(difficulty) {
		while (
			this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
		) {
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log(`Block mined: ${this.hash}`);
	}

	/**
	 * Validates all the transactions inside this block (signature + hash) and
	 * returns true if everything checks out. False if the block is invalid.
	 *
	 * @returns {boolean}
	 */
	hasValidTransactions() {
		for (const tx of this.transactions) {
			if (!tx.isValid()) {
				return false;
			}
		}

		return true;
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 10;
		this.node = new Set();
	}
	// constructor(obj) {
	// 	this.chain = [this.createGenesisBlock()];
	// 	this.difficulty = 2;
	// 	this.pendingTransactions = [];
	// 	this.miningReward = 10;
	// 	this.node = new Set();
	// 	for (let prop in obj) this[prop] = obj[prop];
	// }

	/**
	 * @returns {Block}
	 */
	createGenesisBlock() {
		return new Block(Date.parse("2017-01-01"), [], "0");
	}

	// get full chain
	getFullChain() {
		return this.chain;
	}
	/**
	 * Returns the latest block on our chain. Useful when you want to create a
	 * new Block and you need the hash of the previous Block.
	 *
	 * @returns {Block[]}
	 */
	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	/**
	 * Takes all the pending transactions, puts them in a Block and starts the
	 * mining process. It also adds a transaction to send the mining reward to
	 * the given address.
	 *
	 * @param {string} miningRewardAddress
	 */
	minePendingTransactions(miningRewardAddress) {
		const rewardTx = new Transaction(
			"ArifCoin",
			miningRewardAddress,
			this.miningReward
		);
		this.pendingTransactions.push(rewardTx);

		let block = new Block(
			Date.now(),
			this.pendingTransactions,
			this.getLatestBlock().hash
		);
		block.mineBlock(this.difficulty);

		console.log("Block successfully mined!");
		this.chain.push(block);

		this.pendingTransactions = [];
	}

	recharge(to, amount) {
		const rechargeTx = new Transaction("ArifCoin", to, amount);
		this.pendingTransactions.push(rechargeTx);

		console.log("Recharge : " + amount);
	}
	/**
	 * Add a new transaction to the list of pending transactions (to be added
	 * next time the mining process starts). This verifies that the given
	 * transaction is properly signed.
	 *
	 * @param {Transaction} transaction
	 */
	addTransaction(transaction) {
		if (!transaction.fromAddress || !transaction.toAddress) {
			throw new Error("Transaction must include from and to address");
		}

		// Verify the transaction
		if (!transaction.isValid()) {
			throw new Error("Cannot add invalid transaction to chain");
		}

		if (transaction.amount <= 0) {
			throw new Error("Transaction amount should be higher than 0");
		}

		this.pendingTransactions.push(transaction);
	}

	/**
	 * Returns the balance of a given wallet address.
	 *
	 * @param {string} address
	 * @returns {number} The balance of the wallet
	 */
	getBalanceOfAddress(address) {
		let balance = 0;

		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address) {
					balance -= trans.amount;
				}

				if (trans.toAddress === address) {
					balance += trans.amount;
				}
			}
		}

		return balance;
	}

	/**
	 * Returns a list of all transactions that happened
	 * to and from the given wallet address.
	 *
	 * @param  {string} address
	 * @return {Transaction[]}
	 */
	getAllTransactionsForWallet(address) {
		const txs = [];

		for (const block of this.chain) {
			for (const tx of block.transactions) {
				if (tx.fromAddress === address || tx.toAddress === address) {
					txs.push(tx);
				}
			}
		}

		return txs;
	}

	/**
	 * Loops over all the blocks in the chain and verify if they are properly
	 * linked together and nobody has tampered with the hashes. By checking
	 * the blocks it also verifies the (signed) transactions inside of them.
	 *
	 * @returns {boolean}
	 */
	isChainValid() {
		// Check if the Genesis block hasn't been tampered with by comparing
		// the output of createGenesisBlock with the first block on our chain
		const realGenesis = JSON.stringify(this.createGenesisBlock());

		if (realGenesis !== JSON.stringify(this.chain[0])) {
			return false;
		}

		// Check the remaining blocks on the chain to see if there hashes and
		// signatures are correct
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];

			if (!currentBlock.hasValidTransactions()) {
				return false;
			}

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
		}

		return true;
	}
	// check valid transaction
	isValidTransaction(t) {
		if (t.fromAddress === "ArifCoin") return true;

		if (!t.signature || t.signature.length === 0) {
			throw new Error("No signature in this transaction");
		}

		const publicKey = ec.keyFromPublic(t.fromAddress, "hex");
		return publicKey.verify(
			SHA256(t.fromAddress + t.toAddress + t.amount + t.timestamp).toString(),
			t.signature
		);
	}
	// check a chain's validity
	isValidResolveChain(chain) {
		const realGenesis = JSON.stringify(this.createGenesisBlock());

		if (realGenesis !== JSON.stringify(chain[0])) {
			return false;
		}

		for (let i = 1; i < chain.length; i++) {
			const currentBlock = chain[i];

			// check genesis block
			let re_calculatedHash = SHA256(
				currentBlock.previousHash +
					currentBlock.timestamp +
					JSON.stringify(currentBlock.transactions) +
					currentBlock.nonce
			).toString();
			if (currentBlock.hash !== re_calculatedHash) {
				return false;
			}
			// check hash
			if (currentBlock.previousHash !== chain[i - 1].hash) {
				return false;
			}
			// check transaction
			currentBlock.transactions.forEach(t => {
				if (!this.isValidTransaction(t)) {
					return false;
				}
			});
		}

		return true;
	}

	// register nodes
	registerNode(node) {
		let url = parse(node, true);
		const newNode = url.origin;
		this.node.add(newNode);
	}

	// get nodes
	getNodes() {
		return [...this.node];
	}

	// resolve conflicts
	async resolveConflicts() {
		let neighbors = this.getNodes();
		let newChain = null;

		let maxLength = this.chain.length;
		// neighbors.forEach(async node => {
		// 	const response = await axios.get(node + "/chain");
		// 	if (response.status === 200) {
		// 		let length = response.data.blockchain.length;
		// 		let _chain = response.data.blockchain;
		// 		// let testBlockChain = new Blockchain({ _chain });
		// 		let status = this.isValidResolveChain(_chain);

		// 		if (length > maxLength && status) {
		// 			maxLength = length;
		// 			newChain = _chain;
		// 		}
		// 	}
		// });

		for (const node of neighbors) {
			const response = await axios.get(node + "/chain");
			if (response.status === 200) {
				let length = response.data.blockchain.length;
				let _chain = response.data.blockchain;
				// let testBlockChain = new Blockchain({ _chain });
				let status = this.isValidResolveChain(_chain);

				if (length > maxLength && status) {
					maxLength = length;
					newChain = _chain;
				}
			}
		}
		// console.log(maxLength, newChain);

		// Replace our chain if we discovered a new, valid chain longer than ours
		if (newChain != null) {
			this.chain = newChain;
			return true;
		}

		return false;
	}
}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
module.exports.Transaction = Transaction;
