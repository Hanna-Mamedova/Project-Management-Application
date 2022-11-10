import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board, Column } from '../core/models/interfaces';
import { Store } from '@ngrx/store';
import { getBoardById } from '../core/store/actions/boards.actions';
import { Observable, Subscription, map } from 'rxjs';
import { selectBoard } from '../core/store/selectors/boards.selectors';
import { BoardsStateInterface } from '../core/store/state.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  // board: Board = {
  //   id: '1',
  //   title: 'TITLE1',
  //   description: 'dsf',
  //   columns: [
  //     {
  //       id: '1',
  //       title: 'COLUMN1',
  //       order: 1,
  //       tasks: [
  //         {
  //           id: '1;',
  //           title: 'TASK1',
  //           order: 1,
  //           description: 'sfdj;sfd',
  //           userId: 'sdf;j;',
  //           boardId: 'af;jf',
  //           columnId: 'sd;fj;',
  //         },
  //         {
  //           id: '2;',
  //           title: 'TASK2',
  //           order: 2,
  //           description: 'sdfsff;sfd',
  //           userId: 'sd;',
  //           boardId: 'asdf',
  //           columnId: 'sdffj;',
  //         },
  //       ],
  //     },
  //     {
  //       id: '2',
  //       title: 'COLUMN2',
  //       order: 2,
  //       tasks: [
  //         {
  //           id: '3;',
  //           title: 'TASK3',
  //           order: 1,
  //           description: 'sfdj;sfd',
  //           userId: 'sdf;j;',
  //           boardId: 'af;jf',
  //           columnId: 'sd;fj;',
  //         },
  //         {
  //           id: '4',
  //           title: 'TASK4',
  //           order: 2,
  //           description: 'sdfsff;sfd',
  //           userId: 'sd;',
  //           boardId: 'asdf',
  //           columnId: 'sdffj;',
  //         },
  //       ],
  //     },
  //   ],
  // };
  board$: Observable<Board>;

  columns$: Observable<Column[]>;

  columnIds$: Observable<string[]>;

  queryParam: Subscription;

  id: string;

  constructor(
    private store: Store<BoardsStateInterface>,
    private route: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
    this.getBoardId();
    this.store.dispatch(getBoardById());
    this.board$ = this.store.select(selectBoard(this.id));
    this.columns$ = this.board$.pipe(
      map((board) => board.columns!),
    );
    this.columnIds$ = this.columns$.pipe(
      map((columns) => columns.map(column => column.id!))
    );
  }

  getBoardId() {
    this.queryParam = this.route.queryParams
      .subscribe((params) => {
        if (Object.keys(params).length !== 0) {
          this.id = params['id'];
        }
      });
  }


  public dropGrid(event: CdkDragDrop<any[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy() {
    this.queryParam.unsubscribe();
  }

}
