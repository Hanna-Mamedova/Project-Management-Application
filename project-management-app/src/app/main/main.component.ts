import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardsStateInterface } from '../core/store/state.models';
import { CreateBoardComponent } from './create-board/create-board.component';
import { Store } from '@ngrx/store';
import { selectBoards, selectSearchedBoards } from '../core/store/selectors/boards.selectors';
import { getBoards } from '../core/store/actions/boards.actions';
import { debounceTime, distinctUntilChanged, filter, fromEvent, Observable, Subscription } from 'rxjs';
import { Board } from '../core/models/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  boards$: Observable<Board[]>;

  sub: Subscription;

  @ViewChild('input') input: ElementRef;

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

  ngAfterViewInit(): void {
    this.sub = fromEvent(this.input.nativeElement, 'keyup').pipe(
      filter(Boolean),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(() => this.boards$ = this.store.select(selectSearchedBoards(this.input.nativeElement.value)));
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
