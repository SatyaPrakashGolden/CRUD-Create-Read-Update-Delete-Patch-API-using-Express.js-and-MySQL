const { genSaltSync, hashSync, compareSync} = require('bcrypt');
const {create,getUsers,getUserByUserId,updateUser,deleteUser,patchUser,getUserByUserEmail } = require('./user.service.js');
const { sign } = require("jsonwebtoken");



const createUser = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: 0,
                message: "Internal server error"
            });
        }
        const createdUser = results;
        
        // Generate a token for the newly registered user
        const jsontoken = sign({ userId: createdUser.id }, "satya123", {
            expiresIn: "1h"
        });
        
        return res.status(200).json({
            success: 1,
            message: "User created successfully",
            user: createdUser,
            token: jsontoken // Return the generated token
        });
    });
};



const getAllUsers = (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Internal server error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results // Assuming 'results' already includes the 'id' field
      });
    });
  };
const getUserById = (req, res) => {
  const userId = req.params.id; 
  getUserByUserId(userId, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: 0,
        message: "Internal server error"
      });
    }

    if (!user) {
      return res.status(404).json({
        success: 0,
        message: "User not found"
      });
    }
    return res.status(200).json({
      success: 1,
      data: user
    });
  });
};

const updateUserById = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    // You can add password hashing here if needed
    const salt = genSaltSync(10);
    userData.password = hashSync(userData.password, salt);
  
    updateUser(userId, userData, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Internal server error"
        });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: 0,
          message: "User not found"
        });
      }
  
      return res.status(200).json({
        success: 1,
        message: "User updated successfully"
      });
    });
  };

  const deleteUserById = (req, res) => {
    const userId = req.params.id;
    deleteUser(userId, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Internal server error"
        });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: 0,
          message: "User not found"
        });
      }
  
      return res.status(200).json({
        success: 1,
        message: "User deleted successfully"
      });
    });
  };


  const patchUserById = (req, res) => {
    const userId = req.params.id;
    const updatedFields = req.body; // Fields to be updated
  
    patchUser(userId, updatedFields, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Internal server error"
        });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: 0,
          message: "User not found"
        });
      }
  
      return res.status(200).json({
        success: 1,
        message: "User updated successfully"
      });
    });
  };


  const login = (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                data: "Internal server error"
            });
        }
        if (!results) {
            return res.json({
                success: 0,
                data: "Invalid email or password"
            });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "satya123", {
                expiresIn: "1h"
            });
            return res.json({
                success: 1,
                message: "Login successfully",
                token: jsontoken
            });
        } else {
            return res.json({
                success: 0,
                data: "Invalid email or password"
            });
        }
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    patchUserById,
    login
};

