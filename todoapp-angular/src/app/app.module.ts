import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ RouterModule, Routes } from '@angular/router';
import{ TodoComponent} from './todo.component';
import {CategoryComponent} from './category.component';
import {PriorityComponent} from './priority.component';
import {HomeComponent} from './home.component';
import {Todo_introComponent} from './todo_intro.component';


import { AppComponent } from './app.component';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { CategoryService } from './services/category.service';
import { PriorityService } from './services/priority.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'todo_intro', component: Todo_introComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'priority', component: PriorityComponent },
];

//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Todo_introComponent,
    TodoComponent,
    CategoryComponent,
    PriorityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    

   // NgbModule.forRoot()
  ],
  providers: [
    TodoService,
    CategoryService,
    PriorityService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }