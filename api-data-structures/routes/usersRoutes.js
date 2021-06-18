const express = require('express');
const { createUser } = require('../controllers/users');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');


router.post('/users', createUser)












module.exports = router;