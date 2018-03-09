var PriorityService = require('../services/priority.service.js')

_this = this


// Async Controller function to get the To do List

exports.getPriority = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
         var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 20

    try{
    
        var priority = await PriorityService.getPriority({},page,limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: priority, message:'Priority successfully Recieved'});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({});
        
    }
}

exports.createPriority = async function(req, res, next){

    // Req.Body contains the form submit values.

var priority = {
        priority:req.body.priority
}
    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdPriority = await PriorityService.createPriority(priority);
        return res.status(201).json({data: createdPriority})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        console.log(e);
        return res.status(400).json({})
    }
}

exports.updatePriority = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body.id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.id;

    console.log(req.body)

    var priority = {
        id,
        priority: req.body.priority ? req.body.priority : null,
    }

    try{
        var updatedPriority = await PriorityService.updatePriority(priority)
        return res.status(200).json({status: 200, data: updatedPriority, message: "Succesfully Updated Priority"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removePriority = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await PriorityService.deletePriority(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted"})
        
    }catch(e){
        console.log(e)
        return res.status(400).json({status: 400, message:"Unable to delete"})
    }

}
