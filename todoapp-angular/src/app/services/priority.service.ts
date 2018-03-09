import Priority from '../models/priority.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

//RxJS operator for mapping the observable
import 'rxjs/add/operator/map';

@Injectable()
export class PriorityService {

  api_url = 'http://localhost:3000';
  priorityUrl = `${this.api_url}/api/priority`;
  

  constructor(
    private http: HttpClient
  ) { }


  //Create priority, takes a priority Object
  createPriority(priority: Priority): Observable<any>{
    //returns the observable of http post request 
    
    return this.http.post(`${this.priorityUrl}`, priority);
  }

  //Read priority, takes no arguments
  getPriorities(): Observable<Priority[]>{
    return this.http.get(this.priorityUrl)
    .map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as Priority[];
    })
  }
  //Update priority, takes a priority Object as parameter
  editPriority(priority:Priority){
    let editUrl = `${this.priorityUrl}`
    //returns the observable of http put request 
    if(!priority.id){
      priority.id = priority._id;
    }
    return this.http.put(editUrl, priority);
  }

  deletePriority(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.priorityUrl}/${id}`
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