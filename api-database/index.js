// const express = require('express');
import express from 'express';
const server = express();

// const dotenv = require('dotenv');
import dotenv from 'dotenv';
dotenv.config();

const hostname = 'localhost';
const port = process.env.PORT || 8080

server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res)=> res.send('Safe Courier RESTful API'));
server.get('/data', (req, res)=> res.json({parcelId: "1", parcel: "Toothbrush"}))
server.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}`); 
});
