import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Tasks } from 'src/app/interfaces/tasks';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  public isLoading = false;

  public formTask: FormGroup = new FormGroup({
    description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    priority: new FormControl(null, [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private toastController: ToastController

    ) { }

  ngOnInit() {
  }
  
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

  }

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

}
