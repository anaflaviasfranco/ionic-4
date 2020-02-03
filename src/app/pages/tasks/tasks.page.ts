import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Tasks } from 'src/app/interfaces/tasks';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

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
    private translate: TranslateService,
    private global: GlobalService,
    private router: Router

    ) {
      this.translate.setDefaultLang(this.global.DefaultLanguage);
     }

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
   const tra = await this.translate.getTranslation(this.global.DefaultLanguage).toPromise();

      const toast = await this.toastController.create({
        message: msg,
        duration: 2000,
        position: 'top',
        color,
        buttons: [
          {
            text: tra.tasks.toastClose,
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

  public onLogout(): void {
    this.authService.logout().then( user => {
      console.log('logout ', user);
      this.router.navigateByUrl('/login');
    });
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
      this.formTask.reset();
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

  // setLanguage() {
  //   if(this.global.DefaultLanguage == 'pt'){
  //     this.global.DefaultLanguage = 'en'
  //   }else {
  //     this.global.DefaultLanguage = 'pt'
  //   }
  //   this.translate.setDefaultLang(this.global.DefaultLanguage)
  // }

  changeLanguage(ev) {
    this.global.DefaultLanguage = ev.target.value;
    this.translate.setDefaultLang(this.global.DefaultLanguage);
  }
}
