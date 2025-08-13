const User = require('../models/users'); // adjust the path to your schema file

// Create
module.exports.createUserProfile = (payload) => {
  return new Promise((resolve, reject) => {
    User.create(payload)
      .then((result) => {
        resolve(JSON.parse(JSON.stringify(result)));
      })
      .catch((err) => {
        console.log("Error in createUserProfile:", err);
        reject(err);
      });
  });
};

// Read - by ID
module.exports.getUserDetails = (payload) => {
  return new Promise((resolve, reject) => {
    User.findOne(payload)
      .then((result) => {
        resolve(JSON.parse(JSON.stringify(result)));
      })
      .catch((err) => {
        console.log("Error in getUserDetails:", err);
        reject(err);
      });
  });
};

// Read - all users
module.exports.getUserList = (payload) => {
  return new Promise((resolve, reject) => {
    User.find(payload)
      .then((result) => {
        resolve(JSON.parse(JSON.stringify(result)));
      })
      .catch((err) => {
        console.log("Error in getAllUsers:", err);
        reject(err);
      });
  });
};

// Update - by ID
module.exports.updateUserDetails = (searchQuery, updateQuery) => {
  return new Promise((resolve, reject) => {
    User.updateOne(searchQuery, updateQuery)
      .then((result) => {
        resolve(JSON.parse(JSON.stringify(result)));
      })
      .catch((err) => {
        console.log("Error in updateUserById:", err);
        reject(err);
      });
  });
};

// Delete - by ID
module.exports.deleteUser = (searchQuery) => {
  return new Promise((resolve, reject) => {
    User.deleteOne(searchQuery)
      .then((result) => {
        resolve(JSON.parse(JSON.stringify(result)));
      })
      .catch((err) => {
        console.log("Error in deleteUserById:", err);
        reject(err);
      });
  });
};
