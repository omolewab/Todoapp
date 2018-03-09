import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent  {
  constructor(private router: Router) {

  }

  gotoTodo(): void {
    this.router.navigate(["/todo_intro"]);
  }
}