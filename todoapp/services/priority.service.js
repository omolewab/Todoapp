var PriorityModel = require('../models/priority.model.js')

// Saving the context of this module inside the _the variable
_priorityContext = this

/*exports.getPrioritybyname = async function(priority_name){
    try{
        console.log("priority_name = " + priority_name)
        var priorities = await _priorityContext.getPriority()

        //console.log(priorities);

        var priorityId = null;

        for (var i=0; i < priorities.docs.length; i++){
            if(priority_name ===  priorities.docs[i].Priority){
                priorityId = priorities.docs[i]._id;
            }
        }

        return priorityId;
    }catch(e){
        console.log(e)
    }

}*/

// Async function to get the To do List
exports.getPriority = async function(query, High, Medium, Low){

        // Options setup for the mongoose paginate
        var options = {
            High,
            Medium,
            Low
    
        }
        
        // Try Catch the awaited promise to handle the error 
        
        try {
            var priority = await PriorityModel.paginate(query, options)
    
            
            // Return the todod list that was retured by the mongoose promise
            return priority;
            
    
        } catch (e) {
    
            // return a Error message describing the reason 
            throw Error('Error while Paginating Proirities')
        }
}

exports.createPriority = async function(priority){
    
    // Creating a new Mongoose Object by using the new keyword
//console.log(todo);
    var newPriority = new PriorityModel({
        Priority: priority.priority,
    })

    try{

        // Saving the priority 
        var savedPriority = await newPriority.save()

        return savedPriority;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating Priority")
    }
}

exports.updatePriority = async function(priority){
    var id = priority.id

    try{
        //Find the old Todo Object by the Id
    
        var oldPriority = await PriorityModel.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Priority")
    }

    // If no old Todo Object exists return false
    if(!oldPriority){
        return false;
    }

    console.log(oldPriority)

    //Edit the Todo Object
    oldPriority.priority = priority
    


    console.log(oldPriority)

    try{
        var savedPriority = await oldPriority.save()
        return savedPriority;
    }catch(e){
        throw Error("And Error occured while updating the Priority");
    }
}

exports.deletePriority = async function(id){
    
    // Delete the Priority
    try{
        console.log(id)
        var deleted = await PriorityModel.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Priority Could not be deleted")
        }
        return deleted
    }catch(e){
        console.log(e)
        throw Error("Error Occured while Deleting the Priority")
    }
}