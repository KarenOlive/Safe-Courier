const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {createUser}  = require('../controllers/users')


router.post('/users', createUser)












module.exports = router;