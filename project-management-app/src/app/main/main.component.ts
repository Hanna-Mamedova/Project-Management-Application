import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from './create-board/create-board.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void { }

  onBoardClick() {
    this.router.navigate(['board']);
  }

  openDialog() {
    this.dialog.open(CreateBoardComponent);
  }
}
