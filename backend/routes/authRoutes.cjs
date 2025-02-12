const express = require('express');
const { login } = require('../controllers/authController.cjs');

const router = express.Router();
router.post('/login', login);

module.exports = router;
