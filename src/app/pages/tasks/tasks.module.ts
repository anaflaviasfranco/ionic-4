import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { TaskItemListComponent } from 'src/app/components/task-item-list/task-item-list.component';
import { TasksService } from 'src/app/services/tasks.service';
import { TranslatePriorityPipe } from 'src/app/pipes/translate-priority.pipe';
import { SortByPipe } from 'src/app/pipes/sort-by.pipe';

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
    TaskItemListComponent,
    TranslatePriorityPipe,
    SortByPipe
  ]
})
export class TasksPageModule {}
