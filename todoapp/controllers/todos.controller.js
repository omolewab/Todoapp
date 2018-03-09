// Accessing the Service that we just created

var TodoService = require('../services/todo.service.js')
var PriorityService = require('../services/priority.service.js')
var CategoryService = require('../services/category.service.js')


// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getTodos = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 30

    try{
    
        var todos = await TodoService.getTodos({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: todos, message: "Todos Succesfully Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createTodo = async function(req, res, next){
      

    // Req.Body contains the form submit values.
    //var priorityrequest = await PriorityService.getPrioritybyname(priorityrequest);
var priority = req.body.priority;
var category_ = req.body.category
console.log(category_);
var todo = {
        priority:priority,
        category:category_,
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
        
}
    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdTodo = await TodoService.createTodo(todo);
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        console.log(e);
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}


exports.updateTodo = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body.id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.id;
    //var priority = req.body.id;

    console.log(req.body)

    var todo = {
        id,
        priority:req.body.priority ? req.body.priority : null,
        category:req.body.category ? req.body.category : null,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null,
    }

    try{
        var updatedTodo = await TodoService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Todo"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTodo = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await TodoService.deleteTodo(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message:"Unable to delete Todo"})
    }

}

