import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, {
      validators:[Validators.required, Validators.email]
    }),
    password: new FormControl(null,{
      validators:[Validators.required, Validators.minLength(6)]
    })

  });

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(){
    console.log('form login', this.loginForm.value);
  }

}
