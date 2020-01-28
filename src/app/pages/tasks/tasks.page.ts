import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  constructor(
    // private authService: AuthService
  ) { }

  ngOnInit() {
  }

  // public logout() {
  //   this.authService.logout

  // }

}
