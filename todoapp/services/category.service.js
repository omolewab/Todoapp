// Getting the Newly created Mongoose Model we just created 

var Category = require('../models/category.model.js')
var CategoryTypes = require('../Helpers/category.types.js')

// Saving the context of this module inside the _the variable
_CategoryContext = this



// Async function to get the To do List
exports.getCategory = async function (query, page, limit) {

    var options = {
        page,
        limit,

    }


    // Try Catch the awaited promise to handle the error 

    try {
        var category = await Category.paginate(query, options)


        // Return the todod list that was retured by the mongoose promise
        return category;


    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Category')
    }

}
exports.createCategory = async function (category) {




    var newCategory = new Category({
        Category: category.category,

    })
    try {

        // Saving the Todo 
        var savedCategory = await newCategory.save()


        return savedCategory;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Creating Category")
    }
}

exports.updateCategory = async function (category) {
    var id = category.id

    try {
        //Find the old Category Object by the Id

        var oldCategory = await Category.findById(id);
        //var oldKeyword = await Category(category.keyword);
    } catch (e) {
        console.log(e)
        throw Error("Error occured while Finding the Category")
    }

    // If no old Category Object exists return false
    if (!oldCategory) {
        return false;
    }

    console.log(oldCategory)

    //Edit the Todo Object
    oldCategory.Category = category.category




    console.log(oldCategory)

    try {
        var savedCategory = await oldCategory.save()
        return savedCategory;
    } catch (e) {
        console.log(e)
        throw Error("And Error occured while updating the Category");
    }
}

exports.deleteCategory = async function (id) {

    // Delete the Category
    try {
        console.log(id)
        var deleted = await Category.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error("Category Could not be deleted")
        }
        return deleted
    } catch (e) {
        console.log(e)
        throw Error("Error Occured while Deleting the Category")
    }
}