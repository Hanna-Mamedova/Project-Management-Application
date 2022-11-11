import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from 'src/app/core/models/interfaces';
import { DeleteBoardComponent } from '../delete-board/delete-board.component';
import { UpdateBoardComponent } from '../update-board/update-board.component';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {

  @Input() board: Board;

  onSubmit(): void {
    console.log(this.board.description, 'board');
  }

  @ViewChild('boardTitle') boardTitle: any;

  constructor(
    // private router: Router,
    public dialog: MatDialog,
  ) { }

  openDialogUpdate() {
    this.dialog.open(UpdateBoardComponent);
  }

  openDialogDelete() {
    this.dialog.open(DeleteBoardComponent);
  }

  onEditClick() {
    this.openDialogUpdate();
  }

  onDeleteClick() {
    this.openDialogDelete();
  }

}
