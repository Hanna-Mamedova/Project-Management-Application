import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserRequestService } from 'src/app/core/services/users/user-request.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnDestroy {
  sub: Subscription;

  constructor(private auth: AuthService, private route: Router, private user: UserRequestService, private toast: NotificationsService) {}

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  deleteUser(): void {
    const userId = localStorage.getItem('userId') as string;
    this.sub = this.user.deleteUser(userId).subscribe();
    this.toast.success('Success', 'User was deleted!', { timeOut: 3000 });
    this.logout();
  }

  logout(): void {
    localStorage.clear();
    this.auth.isLoggedIn$.next(!!localStorage.getItem('token'));
    this.route.navigate(['home']);
  }
}


