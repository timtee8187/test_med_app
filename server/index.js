const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToMongo = require('./db');
const app = express();

// Set Mongoose strictQuery option to suppress deprecation warning
mongoose.set('strictQuery', false);

// Set view engine and static files
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define port
const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});