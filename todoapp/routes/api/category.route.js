var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var CategoryController = require('../../controllers/category.controller.js');


// Map each API to the Controller FUnctions

router.get('/', CategoryController.getCategory)

router.post('/', CategoryController.createCategory)

router.put('/', CategoryController.updateCategory)

router.delete('/:id',CategoryController.removeCategory)


// Export the Router

module.exports = router;