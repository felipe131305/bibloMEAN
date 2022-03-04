import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _UserService: UserService, private _router: Router) {}
  
  canActivate(): boolean {
    if (!this._UserService.loggedIn()) {
      this._router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
