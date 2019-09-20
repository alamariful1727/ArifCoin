const bcrypt = require('bcrypt');

const bcryptService = () => {
  const password = (user) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);


    return hash;
  };

  const comparePassword = (pw, hash) => (
    console.log(pw, hash)

  );


  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptService;
