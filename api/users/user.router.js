const router = require("express").Router();
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, patchUserById, login } = require('./user.controller.js');
const { checkToken } = require("../../auth/token_validation.js");
// Define a POST route for creating a user
router.post("/", (req, res) => {
  createUser(req, res);
});

// Define a GET route for retrieving all users
router.get("/",checkToken, (req, res) => {
  getAllUsers(req, res);
});

// Define a GET route for retrieving a user by their ID
router.get("/:id",checkToken, (req, res) => {
  getUserById(req, res);
});

// Define a PUT route for updating a user by their ID
router.put("/:id", checkToken,(req, res) => {
  updateUserById(req, res);
});

// Define a PATCH route for updating specific fields of a user by their ID
router.patch("/:id",checkToken, (req, res) => {
  patchUserById(req, res);
});

// Define a DELETE route for deleting a user by their ID
router.delete("/:id",checkToken, (req, res) => {
  deleteUserById(req, res);
});

// Define a POST route for user login
router.post("/login", checkToken,(req, res) => {
  login(req, res);
});

module.exports = router;
