import Category from '../models/category.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

//RxJS operator for mapping the observable
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  api_url = 'http://localhost:3000';
categoryUrl = `${this.api_url}/api/category`;
  

  constructor(
    private http: HttpClient
  ) { }


  //Create category, takes a category Object
  createCategory(category: Category): Observable<any>{
    //returns the observable of http post request 
    
    return this.http.post(`${this.categoryUrl}`, category);
  }

  //Read category, takes no arguments
  getCategories(): Observable<Category[]>{
    return this.http.get(this.categoryUrl)
    .map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as Category[];
    })
  }
  //Update category, takes a category Object as parameter
  editCategory(category:Category){
    let editUrl = `${this.categoryUrl}`
    //returns the observable of http put request 
    if(!category.id){
      category.id = category._id;
    }
    return this.http.put(editUrl, category);
  }

  deleteCategory(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.categoryUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}