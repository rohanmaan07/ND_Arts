const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/CategoryC');

// POST route for creating category
router.post('/', categoryController.createCategory);

module.exports = router;
