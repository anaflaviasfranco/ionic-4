import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Tasks } from '../interfaces/tasks';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    const userTasks: AngularFirestoreDocument<any> = this.afStore.doc(`${this.DB_PATH_TASKS}/${this.user.uid}`);
    return userTasks.collection('tasks').add(task);

  }

  public delete(task: Tasks): Promise<any> {
    const docTask: AngularFirestoreDocument<any> = this.afStore.doc(`/task/${this.user.uid}/tasks/${task.id}`);
    return docTask.delete();


  }

  public update(task: Tasks): Promise<any> {
    if(!this.user) {
      return ;
    }

    const docTask: AngularFirestoreDocument<any> = this.afStore.doc(`/task/${this.user.uid}/tasks/${task.id}`);
    return docTask.update(task);

  }

  public getAll(): Observable<any> {
    if(!this.user) {
      return ;
    }

    const allTasks: AngularFirestoreDocument<any> = this.afStore.doc(`${this.DB_PATH_TASKS}/${this.user.uid}`);
    return allTasks.collection('tasks').get().pipe(
      map(res => res.docs.map (doc => {
        const id = doc.id;
        const data = doc.data();
        return {id, ...data}
      }))
    );
  }
}
