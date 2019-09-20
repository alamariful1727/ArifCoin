const express = require('express');
const passportService = require('../services/passport.services');
const passport = require('passport');
const blockchain = require('./blockchain.controller');
const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });

router.route('/keys').get(blockchain.getKeys);
router.route('/transaction').post(blockchain.newTransaction);
router.route('/mine').post(blockchain.mine);
router.route('/balance').post(blockchain.getBalance);
router.route('/recharge').post(blockchain.recharge);
router.route('/register/nodes').post(blockchain.registerNode);
router.route('/chain').get(blockchain.getFullChain);
router.route('/resolve').get(blockchain.resolve);

module.exports = router;
