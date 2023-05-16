import { Component, OnInit, DoCheck} from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';
import { NonNullAssert } from '@angular/compiler';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck{

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor(){}

  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1);
  }

  public deleteAll(){
    const confirm = window.confirm("Do you really want to delete everything?")
    
    this.taskList = confirm == true ? new Array<TaskList> : this.taskList;
  }

  public addItemTaskList(event: string){

    if(event.trim().length != 0){
      this.taskList.push({task: event, checked: false})
    }
  }

  public validationInput(event: string, index: number){
    
    if(!event.length){
      const confirm = window.confirm("A task está vazia, deseja deletar?");

      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked))
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
