const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const { Schema } = mongoose;

// defining all the fields of individual account
const accountsSchema = Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: false,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

accountsSchema.pre('save', function(next) {
  const account = this;

  // only hash the password if it has been modified (or is new)
  if (!account.isModified('password')) {
    return next();
  }

  // generate a salt
  // promise function ES6 style
  return new Promise((resolve, reject) =>
    // Generate hash's random salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(err);
      }

      // Now, with the given salt, generate the hash
      bcrypt.hash(account.password, salt, (err, hash) => {
        if (err) {
          return reject(err);
        }

        // Hash generated successfully!
        account.password = hash;
        return resolve(hash);
      });
    }),
  );
});

accountsSchema.methods.comparePassword = function(
  candidatePassword,
  cb,
) {
  // es5 style
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// generating jwt token
accountsSchema.methods.generateJwt = function() {
  // const token = new token();
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    config.jwtSecret,
    {
      expiresIn: 60 * 60 * 60 * 24,
    },
  );
};

module.exports = mongoose.model('Account', accountsSchema);
