import { Component, OnInit, Input } from '@angular/core';
import { Tasks } from 'src/app/interfaces/tasks';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-item-list',
  templateUrl: './task-item-list.component.html',
  styleUrls: ['./task-item-list.component.scss'],
})
export class TaskItemListComponent implements OnInit {

  public disabled = false;

  @Input() public task: Tasks;

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit() {}

  public onChangeToggle(event: CustomEvent, taskID: string): void{

    this.disabled = true;
    this.task.todo = event.detail.checked;
    this.tasksService.update(this.task).then(task => {
      this.disabled = false;
    });

  }

}
