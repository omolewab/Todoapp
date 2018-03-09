import { Response } from '@angular/http';
import { PriorityService } from './services/priority.service';
import Priority from './models/priority.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  
})
export class PriorityComponent implements OnInit {

  constructor(
    //Private priorityservice will be injected into the component by Angular Dependency Injector
    private priorityService: PriorityService
  ) { }
  ngOnInit(): void {
    
        //At component initialization the 
        this.priorityService.getPriorities()
          .subscribe(priorities => {
            //assign the prioritylist property to the proper http response
            this.prioritiesList = priorities
            console.log(priorities)
          })
      }
       //This method will get called on Create button event
      
       create() {
        this.priorityService.createPriority(this.newPriority)
          .subscribe((res) => {
            console.log(res.data);
            this.prioritiesList.push(res.data);
            this.newPriority = new Priority();
          })
    }
  //Declaring the new priority Object and initilizing it
  public newPriority: Priority = new Priority()

  //An Empty list for the visible priority list
  prioritiesList: Priority[] = [];
  editPriorities: Priority[] = [];
  editPriority(priority: Priority) {
    console.log(priority)
    if(this.prioritiesList.includes(priority)){
      if(!this.editPriorities.includes(priority)){
        this.editPriorities.push(priority)
      }else{
        this.editPriorities.splice(this.editPriorities.indexOf(priority), 1)
        this.priorityService.editPriority(priority).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editPriority(priority)
          console.error('Update Unsuccesful')
        })
      }
    }
  }
  donePriority(priority:Priority){
    priority.status = 'Done'
    this.priorityService.editPriority(priority).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editPriority(priority)
      console.error('Update Unsuccesful')
    })
}
submitPriority(event, priority:Priority){
  if(event.keyCode ==13){
    this.editPriority(priority)
  }
}
deletePriority(priority: Priority) {
  this.priorityService.deletePriority(priority._id).subscribe(res => {
    this.prioritiesList.splice(this.prioritiesList.indexOf(priority), 1);
  })
}

  
}