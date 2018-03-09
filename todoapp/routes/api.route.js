var express = require('express')

var router = express.Router()
var todos = require('./api/todos.route.js')
var priority = require('./api/priority.route.js')
var category = require('./api/category.route.js')


router.use('/todos', todos);
router.use('/priority', priority);
router.use('/category', category);

module.exports = router;