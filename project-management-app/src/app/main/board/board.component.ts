import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;

  @ViewChild("boardTitle") boardTitle: any;

  constructor(private router: Router) { }

  ngOnInit(): void { };

  onBoardClick() {
    this.router.navigate(['board']);
  }

  onEditClick() {
    // this.board.title = updatedTitle;
    this.boardTitle.nativeElement.focus();
    console.log(this.boardTitle, 'hi');

  }
}
