import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): boolean {
    const isLoggedIn = this.authService.isLoggedIn$.getValue();
    if (isLoggedIn) return true;
    this.router.navigate(['auth/login']);
    return false;
  }
}
