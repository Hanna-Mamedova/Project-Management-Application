import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private route: Router) {}

  canLoad(): boolean {
    const isLoggedIn = this.auth.isLoggedIn$.getValue();
    if (isLoggedIn) return true;
    this.route.navigate(['auth/login']);
    return false;
  }
}
