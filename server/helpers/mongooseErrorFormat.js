'use strict';

/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function(err, msg = ' already exists') {
  var output;

  try {
    var fieldName = err.errmsg.substring(
      err.errmsg.lastIndexOf('.$') + 2,
      err.errmsg.lastIndexOf('_1')
    );
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + msg;
  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function(err, msg = ' already exists') {
  var message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err, msg);
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};
