import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {

  @Input() board: Board;

  @ViewChild('boardTitle') boardTitle: any;

  constructor(private router: Router) { }

  onBoardClick() {
    this.router.navigate(['board']);
  }

  onEditClick() {
    this.boardTitle.nativeElement.focus();
  }
}
