const express = require('express');
const server = express();

const dotenv = require('dotenv');
dotenv.config();

const hostname = 'localhost';
const port = process.env.PORT || 5000

const parcelRoutes = require('./routes/parcelRoutes');
const usersRoutes = require('./routes/usersRoutes');

server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));
server.use('/api/v1', parcelRoutes);
server.use('/api/v1', usersRoutes);
server.get('/api/v1/', (req, res)=> res.send('Safe Courier API'))

server.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`); 
});