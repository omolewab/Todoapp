import { Response } from '@angular/http';
import { CategoryService } from './services/category.service';
import Category from './models/category.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  
})
export class CategoryComponent implements OnInit {

  constructor(
    //Private categoryservice will be injected into the component by Angular Dependency Injector
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    
        //At component initialization the 
        this.categoryService.getCategories()
          .subscribe(categories => {
            //assign the categorylist property to the proper http response
            this.categoriesList = categories
            console.log(categories)
          })
      }
       //This method will get called on Create button event
      
       create() {
        this.categoryService.createCategory(this.newCategory)
          .subscribe((res) => {
            console.log(res.data);
            this.categoriesList.push(res.data);
            this.newCategory = new Category();
          })
    }
  //Declaring the new category Object and initilizing it
  public newCategory: Category = new Category()

  //An Empty list for the visible category list
  categoriesList: Category[] = [];
  editCategories: Category[] = [];
  editCategory(category: Category) {
    console.log(category)
    if(this.categoriesList.includes(category)){
      if(!this.editCategories.includes(category)){
        this.editCategories.push(category)
      }else{
        this.editCategories.splice(this.editCategories.indexOf(category), 1)
        this.categoryService.editCategory(category).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editCategory(category)
          console.error('Update Unsuccesful')
        })
      }
    }
  }
  doneCategory(category:Category){
    category.status = 'Done'
    this.categoryService.editCategory(category).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editCategory(category)
      console.error('Update Unsuccesful')
    })
}
submitCategory(event, category:Category){
  if(event.keyCode ==13){
    this.editCategory(category)
  }
}
deleteCategory(category: Category) {
  this.categoryService.deleteCategory(category._id).subscribe(res => {
    this.categoriesList.splice(this.categoriesList.indexOf(category), 1);
  })
}

  
}