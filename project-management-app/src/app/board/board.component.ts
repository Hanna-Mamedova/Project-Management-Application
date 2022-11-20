import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBoard } from '../core/store/actions/boards.actions';
import { map, Subscription } from 'rxjs';
import { selectBoard, selectColumns } from '../core/store/selectors/boards.selectors';
import { BoardStateInterface } from '../core/store/state.models';
import { Board, Column } from '../core/models/interfaces';
import { addColumn, sortColumns } from '../core/store/actions/columns.actions';
import { COLUMN_CREATED_TITLE, Messages, TOAST_TIMEOUT } from '../core/constants/constants';
import { NotificationsService } from 'angular2-notifications';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  isEditEnable: boolean = false;

  board$ = this.store.select(selectBoard);

  columns$ = this.store.select(selectColumns);

  columnIds$ = this.columns$.pipe(map((columns) => columns.map((column: Column) => column.id!)));

  titleBoardControlForm: FormControl;
  // titleBoard: string;
  sub: Subscription;
  editedTitleBoard: string;

  @Input()
  board: Board;

  constructor(
    private store: Store<BoardStateInterface>,
    private toastService: NotificationsService,
  ) { }


  ngOnInit() {
    this.store.dispatch(getBoard());
    this.showSuccess(Messages.BOARD_LOADED);
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });

    this.titleBoardControlForm = new FormControl({ title: ['hi', [Validators.required]] });

    // this.title$ = this.column.title;
    // console.log(this.title$, 'hi');
    this.onSubmitTitleBoard();
  }

  // get titleBoardControl() {
  //   return this.titleBoardControlForm.value;
  // }

  onEdit() {
    this.isEditEnable = true;
  }

  onSubmitTitleBoard(): void {
    // this.titleBoardControlForm.setValue(this.titleBoardControlForm.value);
    this.sub.add(this.titleBoardControlForm.get('title')?.valueChanges.subscribe((text: string) => {
      this.editedTitleBoard = text;
    }));
    // console.log();

  }



  onCancel(): void {
    this.isEditEnable = false;
    // this.title = this.column.title;

  }

  public dropGrid(event: CdkDragDrop<Column[] | null>) {
    this.store.dispatch(sortColumns({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    }));
  }

  addColumn(): void {
    this.store.dispatch(addColumn({ column: { title: COLUMN_CREATED_TITLE } }));
    this.showSuccess(Messages.COLUMN_CREATED);
  }
}
