import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-board',
  templateUrl: './delete-board.component.html',
  styleUrls: ['./delete-board.component.scss']
})
export class DeleteBoardComponent implements OnDestroy {

  sub: Subscription;

  constructor(public dialogRef: MatDialogRef<DeleteBoardComponent>,
    // private auth: AuthService,
    private toast: NotificationsService,
    // private route: Router,
    // private user: UserRequestService,
  ) { }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  onConfirm(): void {
    // const userId = localStorage.getItem('userId') as string;
    // this.sub = this.user.deleteUser(userId).subscribe();
    this.toast.success('Success', 'Board was deleted!', { timeOut: 3000 });
    // localStorage.clear();
    // this.auth.isLoggedIn$.next(!!localStorage.getItem('token'));
    // this.route.navigate(['home']);
  }

}
