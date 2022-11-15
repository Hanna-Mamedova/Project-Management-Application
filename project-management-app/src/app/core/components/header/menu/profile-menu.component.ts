import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CreateBoardComponent } from 'src/app/main/create-board/create-board.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent {

  constructor(
    public auth: AuthService,
    private route: Router,
    public dialog: MatDialog) { }

  createBoard(): void {
    this.dialog.open(CreateBoardComponent);
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


