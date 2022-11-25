import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): boolean {
    const isLoggedIn: boolean = this.authService.isLoggedIn$.getValue();
    if (isLoggedIn) return true;
    this.router.navigate(['auth/login']);
    return false;
  }

  canActivate(): boolean {
    const isLoggedIn: boolean = this.authService.isLoggedIn$.getValue();
    if (!isLoggedIn) return true;
    else {
      this.router.navigate(['main']);
      return false;
    }
  }
}
