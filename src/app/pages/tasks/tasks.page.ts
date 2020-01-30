import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Tasks } from 'src/app/interfaces/tasks';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  public task$: Observable<Tasks>;
  public  user: Auth;
  public isLoading = false;
  private authSubscription: Subscription
  
  public formTask: FormGroup = new FormGroup({
    description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    priority: new FormControl(null, [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private toastController: ToastController,
    

    ) { }

  ngOnInit() {

    this.authService.user$.subscribe( user => {
      this.user = user;
      this.upDateAll();
    })
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
    // metodos privados
  private async presentToast (msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      //duration: 2000,
      position: 'top',
      color,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  private upDateAll(): void {

    this.task$ = this.tasksService.getAll();

  }

  //metodos publicos

  public logout() {
    this.authService.logout();
  }


  public onSubmitForm():void {
    if (this.formTask.invalid) {
      return;
    }

    this.isLoading = true;
    const task: Tasks = this.formTask.value;
    task.todo = true;
    task.createTime = new Date();

    this.tasksService.create(task).then(res => {
      this.isLoading = false;
      this.presentToast('Tarefa criada com sucesso', 'success');
      this.upDateAll();
    }).catch(error => {
      this.presentToast(error.message, 'danger');
    }).finally(() => {
      this.isLoading = false;
    })
  }

  public onDeleteTask(task: Tasks): void {
    this.tasksService.delete(task).then(res => {
      this.presentToast('Tarefa deletada com sucesso!', 'success');
      this.upDateAll();
    }).catch(error => {
      this.presentToast(error.message, 'danger');
    });
  }

}
