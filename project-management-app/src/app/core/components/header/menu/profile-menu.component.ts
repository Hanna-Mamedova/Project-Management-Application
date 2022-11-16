import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Messages, MODAL_ANIMATION_TIMEOUT, TOAST_TIMEOUT } from 'src/app/core/constants/constants';
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
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private toastService: NotificationsService,
    public userReqService: UserRequestService,
    private translateService: TranslateService) { }

  createBoard(): void {
    this.dialog.open(CreateBoardComponent);
  }

  openDialog(): void {
    const deleteUser = (): void => {
      const userId = localStorage.getItem('userId') as string;
      this.sub = this.userReqService.deleteUser(userId).subscribe(data => {
        if (data === null) {
          this.toastService.success(Messages.SUCCESS, Messages.USER_DELETED, { timeOut: TOAST_TIMEOUT });
          localStorage.clear();
          this.authService.isLoggedIn$.next(!!localStorage.getItem('token'));
          this.router.navigate(['home']);
        }
      });
    };

    this.translateService.get([
      'Dialog.deleteUser.title',
      'Dialog.deleteUser.message',
      'Dialog.deleteUser.decline',
      'Dialog.deleteUser.confirm',
    ]).subscribe(translations => {
      this.title = translations['Dialog.deleteUser.title'];
      this.message = translations['Dialog.deleteUser.message'];
      this.decline = translations['Dialog.deleteUser.decline'];
      this.confirm = translations['Dialog.deleteUser.confirm'];
    });

    const dialogParams: DialogData = {
      title: this.title,
      message: this.message,
      decline: this.decline,
      confirm: this.confirm,
      action: deleteUser,
    };
    this.dialogService.confirmDialog(MODAL_ANIMATION_TIMEOUT, MODAL_ANIMATION_TIMEOUT, dialogParams);
  }

  logout(): void {
    localStorage.clear();
    this.authService.isLoggedIn$.next(!!localStorage.getItem('token'));
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}


