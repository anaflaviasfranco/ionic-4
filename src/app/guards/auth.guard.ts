import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate  {

  constructor(
    private authService: AuthService
  ){ } 

  public canActivate (

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //pipe é como se fosse um modificador da funçao
      return this.authService.user$.pipe(
        take(1),
        map(user => {
          return Boolean(user);
        })

      )
    }
  
}
