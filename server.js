try {
    const express = require("express");
    const server = express();
    require('dotenv').config();
    const connectDB = require('./data/connection/connection');
    const PORT = process.env.PORT || 3000;

   connectDB();  
    server.use(express.json());
    server.use('/api/user', require('./routes/users'));
    server.listen(PORT, function () {
        console.log(`Server is running on ${PORT}...`)
    })

} catch (error) {
    console.info('Failed to prepare app.');
    console.error(error);
}