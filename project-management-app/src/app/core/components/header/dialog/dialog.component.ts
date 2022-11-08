import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserRequestService } from 'src/app/core/services/users/user-request.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnDestroy {
  sub: Subscription;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, 
    private auth: AuthService,
    private toast: NotificationsService,
    private route: Router,
    private user: UserRequestService) { }
  
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  onConfirm(): void {
    const userId = localStorage.getItem('userId') as string;
    this.sub = this.user.deleteUser(userId).subscribe();
    this.toast.success('Success', 'User was deleted!', { timeOut: 3000 });
    localStorage.clear();
    this.auth.isLoggedIn$.next(!!localStorage.getItem('token'));
    this.route.navigate(['home']);
  }
}



