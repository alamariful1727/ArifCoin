const express = require('express');
const accountRoutes = require('./server/account/account.route');
const blockchainRoutes = require('./server/blockchain/blockchain.route');

const router = express.Router();

router.use('/account', accountRoutes);
router.use('/arifcoin', blockchainRoutes);

module.exports = router;
