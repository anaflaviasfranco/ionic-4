import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { TaskItemListComponent } from 'src/app/components/task-item-list/task-item-list.component';
import { TasksService } from 'src/app/services/tasks.service';
import { SortByPipe } from 'src/app/pipes/sort-by.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { GlobalService } from 'src/app/services/global.service';
import { ColorPriorityPipe } from 'src/app/pipes/color-priority.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  declarations: [
    TasksPage,
    TaskItemListComponent,
    ColorPriorityPipe,
    SortByPipe,
  ],
  providers: [
    GlobalService
  ]
})
export class TasksPageModule {}
