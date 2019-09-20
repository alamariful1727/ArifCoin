const express = require('express');
const passportService = require('../services/passport.services');
const passport = require('passport');
const paramValidation = require('./account.validation');

const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', {
  session: false,
});
const accountCtrl = require('./account.controller');
const schemaValidator = require('../helpers/joiSchemaValidator');

// authentication
router
  .route('/signup')
  .post(
    schemaValidator(paramValidation.register),
    accountCtrl.register,
  );
router
  .route('/login')
  .post(
    schemaValidator(paramValidation.login),
    requireLogin,
    accountCtrl.login,
  );

router.route('/update/:accountId').put(accountCtrl.accountUpdate);

router.route('/').get(requireAuth, accountCtrl.getAccount);
router.route('/logout').get(accountCtrl.logout);

router.route('/forgetPassword').post(accountCtrl.forgetPassword);
router
  .route('/forgetPassword/:token')
  .get(accountCtrl.verifyChangePassword);
router.route('/changePassword').post(accountCtrl.changePassword);

router.param('accountId', accountCtrl.accountLoad);

module.exports = router;
