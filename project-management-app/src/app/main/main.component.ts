import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from './create-board/create-board.component';
import { dataBoards } from './main.mock.data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  boards = dataBoards;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  openDialog() {
    this.dialog.open(CreateBoardComponent);
  }

}
