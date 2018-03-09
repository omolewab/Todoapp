import { Response } from '@angular/http';
import { TodoService } from './services/todo.service';
import { CategoryService } from './services/category.service';
import { PriorityService } from './services/priority.service';
import ToDo from './models/todo.model';
import Category from './models/category.model';
import Priority from './models/priority.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',

})
export class TodoComponent implements OnInit {

  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    private todoService: TodoService,
    private categoryService: CategoryService,
    private priorityService: PriorityService,
  ) { }
  ngOnInit(): void {

    //At component initialization the 
    this.todoService.getToDos()
      .subscribe(todos => {
        //assign the todolist property to the proper http response
        this.todosList = todos
        console.log(todos)
      });
      
      this.categoryService.getCategories()
      .subscribe(categories => {
        //assign the categorylist property to the proper http response
        this.categoriesList = categories
        console.log(categories)
      });

      this.priorityService.getPriorities()
      .subscribe(priorities => {
        //assign the prioritylist property to the proper http response
        this.prioritiesList = priorities
        console.log(priorities)
      })

  }
  //This method will get called on Create button event

  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        console.log(res.data);
        this.todosList.push(res.data);
        this.newTodo = new ToDo();
      })
  }
  //Declaring the new todo Object and initilizing it
  public newTodo: ToDo = new ToDo()

  //An Empty list for the visible todo list
  todosList: ToDo[] = [];
  categoriesList: Category[] = [];
  prioritiesList: Priority[] = [];

  editTodos: ToDo[] = [];
  editTodo(todo: ToDo) {
    console.log(todo)
    if (this.todosList.includes(todo)) {
      if (!this.editTodos.includes(todo)) {
        this.editTodos.push(todo)
      } else {
        this.editTodos.splice(this.editTodos.indexOf(todo), 1)
        this.todoService.editTodo(todo).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editTodo(todo)
          console.error('Update Unsuccesful')
        })
      }
    }
  }
  doneTodo(todo: ToDo) {
    todo.status = 'Done'
    this.todoService.editTodo(todo).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editTodo(todo)
      console.error('Update Unsuccesful')
    })
  }
  submitTodo(event, todo: ToDo) {
    if (event.keyCode == 13) {
      this.editTodo(todo)
    }
  }
  deleteTodo(todo: ToDo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    })
  }


}
