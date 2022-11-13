import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog,
  ) { }

  onEditClick() {
    this.dialog.open(UpdateBoardComponent, {
      data: { board: this.board }
    });
  }

  onDeleteClick() {
    this.dialog.open(DeleteBoardComponent, {
      data: { board: this.board }
    });
  }

}
