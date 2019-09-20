const jwt = require('jsonwebtoken');
const Account = require('./account.model');
const smtpTransport = require('../helpers/sendmail');
const config = require('../../config/config');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

const register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    contactNo,
  } = req.body;

  if (!email || !password) {
    return sendJSONresponse(res, 422, {
      error: 'You must provide email and password.',
    });
  }

  Account.find({ email: email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'email is already exits',
        });
      } else {
        // Generate a new key pair and convert them to hex-strings
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');
        let account = new Account({
          firstName,
          lastName,
          email,
          password,
          contactNo,
          publicKey,
          privateKey,
        });
        account.token = account.generateJwt();
        account
          .save()
          .then(user => {
            req.login(user, function(err) {
              if (err) {
                return sendJSONresponse(res, 400, {
                  success: false,
                  message: err,
                });
              }
              return sendJSONresponse(res, 201, {
                success: true,
                user,
              });
            });
          })
          .catch(err => {
            return res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};

const login = async (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

const getAccount = async (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

const logout = async (req, res) => {
  req.logout();
  res.json({
    success: true,
    msg: 'You are successfully logout',
  });
  res.end();
};

const accountUpdate = async (req, res, next) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const contactNo = req.body.contactNo;

  Account.findById(req.account._id)
    .then(account => {
      Account.find({
        email: email,
      })
        .exec()
        .then(user => {
          if (user.length >= 1) {
            return res.status(409).json({
              message: 'email is already exits',
            });
          } else {
            let account = new Account();
            account.email = email;
            account.firstName = firstName;
            account.lastName = lastName;
            account.contactNo = contactNo;
            account.password = req.account.password;
            account.save().then(() => {
              return sendJSONresponse(res, 201, {
                success: true,
                message: 'Account Information updated',
              });
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
};

const forgetPassword = async (req, res) => {
  // try {
  //   const locale = req.getLocale();
  //   const data = matchedData(req);
  //   await findAccount(data.email);
  //   const item = await saveForgotPassword(req);
  //   emailer.sendResetPasswordEmailMessage(locale, item);
  //   res.status(200).json(forgotPasswordResponse(item));
  // } catch (error) {
  //   res.json(error);
  // }
  const email = req.body.email;
  Account.findOne({
    email: email,
  })
    .exec()
    .then(user => {
      let info = {};
      info.user = user._id;
      info.expires = new Date(
        // expire within 1 month
        new Date().getTime() + 2630000,
      );
      let token = jwt.encode(info, config.jwtSecret);
      host = req.get('host');
      link =
        'https://5bd8d95c.ngrok.io/api/v1/account/changePassword/' +
        token;
      let mailOptions = {
        to: user.email,
        subject: 'Reset your password',
        html:
          'Hello,<br> Please Click on the link to reset your password.<br><a href=' +
          link +
          '>Click here to verify</a>',
      };
      smtpTransport.sendMail(mailOptions, function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log('Message sent: ' + res);
          res.end({
            success: true,
            msg: 'sent',
          });
        }
      });
    })

    .catch(err => {
      return res.status(400).json({
        success: false,
        message: 'Email id does not exist',
      });
    });
};

const verifyChangePassword = async (req, res) => {
  let token = req.params.token;
  let data = jwt.decode(token, config.jwtSecret);
  if (new Date(data.expires) > new Date()) {
    await Account.findOne({ _id: data.user._id })
      .exec()
      .then(user => {
        return sendJSONresponse(res, 200, {
          success: true,
          message: 'you have permission to change the password',
          user,
        });
      })
      .catch(err => {
        return sendJSONresponse(res, 400, {
          success: false,
          message: 'account not found',
        });
      });
  } else {
    return sendJSONresponse(res, 400, {
      success: false,
      message: 'token time expired',
    });
  }
};

const changePassword = async (req, res) => {
  let newPassword = req.body.password;
  let confirmPassword = req.body.confirmPassword;
  const userID = req.user.id;
  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: 'Password Not Matching' });
  let user = await Account.findOne({ _id: userID })
    .exec()
    .then(user => {
      user.password = newPassword;
      user.save();
      return res.status(200).json({
        message: 'Password Changed',
        user,
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: 'server error',
      });
    });
  user.password = newPassword;
  await user.save();
};

const getAllAccounts = async (req, res) => {
  console.log(req.user);
};

const accountLoad = async (req, res, next, id) => {
  Account.findById(id)
    .exec()
    .then(result => {
      if (result) {
        req.account = result;
        return next();
      } else {
        return res.status(400).json({
          message: 'No valid entry found for provided ID',
        });
      }
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  sendJSONresponse,
  register,
  login,
  logout,
  verifyChangePassword,
  changePassword,
  forgetPassword,
  getAllAccounts,
  getAccount,
  accountLoad,
  accountUpdate,
};
