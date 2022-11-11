import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from './create-board/create-board.component';
import { BoardRequestService } from './../core/services/boards/board-request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();

  boards$ = this.boardRequestService.boards$;

  constructor(public dialog: MatDialog,
    private boardRequestService: BoardRequestService) { }

  ngOnInit() {

    this.subs.add(this.boardRequestService.getBoards()
      .subscribe()
    );
  }

  openDialog() {
    this.subs.add(this.dialog.open(CreateBoardComponent)
      .afterClosed()
      .subscribe(() => {
        this.boardRequestService.getBoards().subscribe();
      }
      ));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
