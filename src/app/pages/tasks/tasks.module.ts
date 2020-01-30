import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { TaskItemListComponent } from 'src/app/components/task-item-list/task-item-list.component';
import { TasksService } from 'src/app/services/tasks.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    TasksPage,
    TaskItemListComponent
  ]
})
export class TasksPageModule {}
