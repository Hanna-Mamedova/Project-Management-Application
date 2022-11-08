import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnDestroy {
  sub: Subscription;

  subDel: Subscription;

  constructor(
    private auth: AuthService, 
    private route: Router, 
    public dialog: MatDialog) {}

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.subDel) this.subDel.unsubscribe();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  logout(): void {
    localStorage.clear();
    this.auth.isLoggedIn$.next(!!localStorage.getItem('token'));
    this.route.navigate(['home']);
  }
}


