const permit = (...allowed) => {
  const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  return (request, response, next) => {
    if (request.user && isAllowed(request.user.role)) {
      next();
    }
    // role is allowed, so continue on the next middleware
    else {
      response.status(403).json({ message: 'Forbidden' }); // user is forbidden
    }
  };
};

const authSelf = content => {
  // return a middleware
  return (request, response, next) => {
    if (
      request.user._id.toString() ===
      request[content].account.toString()
    ) {
      next();
    }
    // role is allowed, so continue on the next middleware
    else {
      response.status(403).json({ message: 'Forbidden' }); // user is forbidden
    }
  };
};

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status('403').json({
      success: false,
      msg: 'User is not authorized',
    });
  }
  next();
};

module.exports = { permit, authSelf, hasAuthorization };
