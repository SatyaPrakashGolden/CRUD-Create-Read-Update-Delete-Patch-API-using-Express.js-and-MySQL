const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware
const router = require('./api/users/user.router.js');
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON data from the request body
app.use(express.json());

// Middleware to parse URL-encoded data from the request body
app.use(express.urlencoded({ extended: true }));


// Router
app.use('/api/users', router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
