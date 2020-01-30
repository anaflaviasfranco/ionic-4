import { Component, OnInit, Input } from '@angular/core';
import { Tasks } from 'src/app/interfaces/tasks';

@Component({
  selector: 'app-task-item-list',
  templateUrl: './task-item-list.component.html',
  styleUrls: ['./task-item-list.component.scss'],
})
export class TaskItemListComponent implements OnInit {

  @Input() public task: Tasks;
  constructor() { }

  ngOnInit() {}

  public onChangeToggle(event: CustomEvent, taskID: string): void{
    
  }

}
