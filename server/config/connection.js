// Import mongoose module and export connection
const mongoose = require('mongoose');

// Connect to the MongoDB database by URI or a default local URI (DB name)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-shopping');

module.exports = mongoose.connection;
