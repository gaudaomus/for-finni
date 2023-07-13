var express = require('express');
const { userVerification } = require('../middlewares/AuthMiddleware');
var router = express.Router();

router.post('/', userVerification);

module.exports = router;
