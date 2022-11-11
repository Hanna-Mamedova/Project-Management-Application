import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CreateBoardComponent } from 'src/app/main/create-board/create-board.component';
import { DialogComponent } from '../dialog/dialog.component';
import { BoardRequestService } from './../../../services/boards/board-request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnDestroy {
  sub: Subscription;

  constructor(
    private auth: AuthService,
    private route: Router,
    public dialog: MatDialog,
    private boardRequestService: BoardRequestService) { }

  createBoard(): void {
    this.sub = this.dialog.open(CreateBoardComponent)
      .afterClosed()
      .subscribe(() => {
        this.boardRequestService.getBoards().subscribe();
      }
      );
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}


