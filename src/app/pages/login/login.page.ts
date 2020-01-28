import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, {
      validators:[Validators.required, Validators.email],
    }),
    password: new FormControl(null,{
      validators:[Validators.required, Validators.minLength(3)]
    })

  });

  public textButton = 'Enviar';
  public isLoading: boolean;
  public isSuccess: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    // setTimeout(()=> {
    //   this.loginForm.setValue({"email": 'ana@flavia', "password": '123456'})
    // }, 3000);
  }

  private async presentToast (msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      //duration: 2000,
      position: 'top',
      color: 'danger',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  public onSubmit(){
    console.log('form login', this.loginForm.value);
    this.isLoading = true;
    this.textButton = 'Enviando Dados';

    //constante é uma variavel que nao pode ser mudada
    const email: string = this.loginForm.get('email').value;
    const password: string = this.loginForm.get('password').value;

    this.authService.loginWithEmail(email, password).then(user => {
      this.isLoading = false;
      this.router.navigateByUrl('tasks');
    }).catch(error => {
      this.isLoading = false;
      this.presentToast(error.message);
    }).finally(() => {
      this.isLoading = false;
    })
  }

}
