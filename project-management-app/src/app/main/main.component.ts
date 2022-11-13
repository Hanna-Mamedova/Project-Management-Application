import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardsStateInterface } from '../core/store/state.models';
import { CreateBoardComponent } from './create-board/create-board.component';
import { Store } from '@ngrx/store';
import { selectBoards } from '../core/store/selectors/boards.selectors';
import { getBoards } from '../core/store/actions/boards.actions';
import { Observable } from 'rxjs';
import { Board } from '../core/models/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$: Observable<Board[]>;

  constructor(
    public dialog: MatDialog,
    private store: Store<BoardsStateInterface>) {
    this.boards$ = this.store.select(selectBoards);
  }

  ngOnInit() {
    this.store.dispatch(getBoards());
  }

  openDialog() {
    this.dialog.open(CreateBoardComponent);
  }

}
