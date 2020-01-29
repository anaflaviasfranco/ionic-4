import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Tasks } from '../interfaces/tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private DB_PATH_TASKS = 'task';
  private user: any;

  constructor(
    private authService: AuthService,
    private afStore: AngularFirestore
  ) { 
    this.authService.user$.subscribe(user => this.user = user);
  }

  public create(task: Tasks): Promise<any>{
    if(!this.user) {
      return ;
    }

    const userTasks: AngularFirestoreDocument<any> = this.afStore.doc(`${DB_PATH_TASKS}/${this.user.uid}`);
    return userTasks.collection('tasks').add(task);

  }

  public delete(task: Tasks): Promise<any> {

  }

  public update(task: Tasks): Promise<any> {

  }

  public getAll(): Observable<any> {


  }



}
