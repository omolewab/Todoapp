var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var PriorityController = require('../../controllers/priority.controller.js');


// Map each API to the Controller FUnctions

router.get('/', PriorityController.getPriority)

router.post('/', PriorityController.createPriority)

router.put('/', PriorityController.updatePriority)

router.delete('/:id',PriorityController.removePriority)


// Export the Router

module.exports = router;