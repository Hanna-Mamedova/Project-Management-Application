import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent {
  constructor(private auth: AuthService, private route: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.auth.isLoggedIn$.next(false);
    this.route.navigate(['home']);
  }
}


