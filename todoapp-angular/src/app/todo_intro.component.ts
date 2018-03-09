import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-todointro',
  templateUrl: './todo_intro.component.html',

})
export class Todo_introComponent  {
  constructor(private router: Router) {

  }

  gotoTodo(): void {
    this.router.navigate(["/todo"]);
  }
}