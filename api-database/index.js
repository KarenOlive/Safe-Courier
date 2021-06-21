// const express = require('express');
import express from 'express';
const server = express();

import cors from 'cors';

import mongoose from 'mongoose';

// const dotenv = require('dotenv');
import dotenv from 'dotenv';
dotenv.config();



import { usersRoutes } from './routes/usersRoutes.js'
import { parcelRoutes } from './routes/parcelRoutes.js';

const hostname = 'localhost';
const port = process.env.PORT || 8080
const uri = process.env.DatabaseURI;

server.use(cors());
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

server.use('/', parcelRoutes);
server.use('/', usersRoutes);


server.get('/', (req, res)=> res.send('Safe Courier RESTful API'));
server.get('/data', (req, res)=> res.json({parcelId: "1", parcel: "Toothbrush"}))



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  }, () => console.log("MongoDB Connected"));
const db = mongoose.connection

db.on('error', (error)=> console.log('connection error'+ error));

db.once('open', () => console.log('database connected'));


server.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}`); 
});
