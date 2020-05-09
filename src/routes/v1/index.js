const express = require('express');
const userRoute = require('./user.route');
const fileRoute = require('./file.route');

const router = express.Router();

router.use('/user', userRoute);
router.use('/file', fileRoute);

module.exports = router;
