import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogData } from 'src/app/core/models/interfaces';
import { DialogService } from 'src/app/core/services/dialog.service';
import { UserRequestService } from 'src/app/core/services/users/user-request.service';
import { CreateBoardComponent } from 'src/app/main/create-board/create-board.component';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})

export class ProfileMenuComponent implements OnDestroy {
  title: string;

  message: string;

  decline: string;

  confirm: string;

  sub: Subscription;

  constructor(
    public auth: AuthService, 
    private route: Router, 
    public dialog: MatDialog,
    private dialogService: DialogService,
    private toast: NotificationsService,
    public user: UserRequestService,
    private translateService: TranslateService) {}

  createBoard(): void {
    this.dialog.open(CreateBoardComponent);
  }

  openDialog(): void {
    const modalAppearenceTimeout = '300ms';
    const popupTimeout = 3000;
    const deleteUser = (): void => {
      const userId = localStorage.getItem('userId') as string;
      this.sub = this.user.deleteUser(userId).subscribe();
      this.toast.success('Success', 'User was deleted!', { timeOut: popupTimeout });
      localStorage.clear();
      this.auth.isLoggedIn$.next(!!localStorage.getItem('token'));
      this.route.navigate(['home']);
    };

    this.translateService.get([
      'Dialog.deleteUser.title',
      'Dialog.deleteUser.message',
      'Dialog.deleteUser.decline',
      'Dialog.deleteUser.confirm',
    ]).subscribe(transations => {
      this.title = transations['Dialog.deleteUser.title'];
      this.message = transations['Dialog.deleteUser.message'];
      this.decline = transations['Dialog.deleteUser.decline'];
      this.confirm = transations['Dialog.deleteUser.confirm'];
    });

    const dialogParams: DialogData = {
      title: this.title, 
      message: this.message,
      decline: this.decline, 
      confirm: this.confirm,
      action:  deleteUser,
    };
    this.dialogService.confirmDialog(modalAppearenceTimeout, modalAppearenceTimeout, dialogParams);
  }

  logout(): void {
    localStorage.clear();
    this.auth.isLoggedIn$.next(!!localStorage.getItem('token'));
    this.route.navigate(['home']);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}


