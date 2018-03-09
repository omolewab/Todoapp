var CategoryService = require('../services/category.service.js')

_this = this


// Async Controller function to get the To do List

exports.getCategory = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
         var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 20

    try{
    
        var category = await CategoryService.getCategory({},page,limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: category, message:'Category successfully Recieved'});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({});
        
    }
}

exports.createCategory = async function(req, res, next){

    // Req.Body contains the form submit values.

var category = {
        category:req.body.category,
       
}
    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdCategory = await CategoryService.createCategory(category);
        return res.status(201).json({data: createdCategory})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        console.log(e);
        return res.status(400).json({})
    }
}

exports.updateCategory = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body.id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body.id;
    console.log(req.body)

    var category = {
        id,
        category: req.body.category ? req.body.category : null,
       
    }

   

    try{
        var updatedCategory = await CategoryService.updateCategory(category)
        return res.status(200).json({status: 200, data: updatedCategory, message: "Succesfully Updated Category"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeCategory = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await CategoryService.deleteCategory(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted"})
        
    }catch(e){
        console.log(e)
        return res.status(400).json({status: 400, message:"Unable to delete"})
    }

}
