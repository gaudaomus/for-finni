const express = require('express');
const { Signup } = require('../controllers/AuthController');
const router = express.Router();

router.post('/', Signup);

module.exports = router;
