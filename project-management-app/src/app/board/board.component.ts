import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { editBoardTitle, getBoard } from '../core/store/actions/boards.actions';
import { map } from 'rxjs';
import { selectBoard, selectBoardTitle, selectColumns } from '../core/store/selectors/boards.selectors';
import { BoardStateInterface } from '../core/store/state.models';
import { Board, Column } from '../core/models/interfaces';
import { addColumn, sortColumns } from '../core/store/actions/columns.actions';
import { COLUMN_CREATED_TITLE, Messages, TOAST_TIMEOUT } from '../core/constants/constants';
import { NotificationsService } from 'angular2-notifications';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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


  //TODO: to check adding
  boardTitle$ = this.store.select(selectBoardTitle);
  title: string;

  titleBoard: string;
  descriptionBoard: string;
  idBoard: string;

  titleBoardControlForm: FormGroup;
  editedTitleBoard: string;

  constructor(
    private store: Store<BoardStateInterface>,
    private toastService: NotificationsService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.store.dispatch(getBoard());
    this.showSuccess(Messages.BOARD_LOADED);

    this.board$.subscribe((data) => {
      this.titleBoard = data.board.title;
      this.descriptionBoard = data.board.description;
      this.idBoard = data.board.id!;
    });

    this.titleBoardControlForm = this.formBuilder.group({
      title: [this.titleBoard, [Validators.required]]
    });
  }

  get titleBoardControl() {
    return this.titleBoardControlForm.controls['title'];
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  onEditBoardTitle() {
    this.isEditEnable = true;
  }

  onSubmitTitleBoard(): void {
    this.editedTitleBoard = this.titleBoardControl.value;

    const editedBoard: Board = {
      title: this.editedTitleBoard,
      description: this.descriptionBoard,
    };

    this.store.dispatch(editBoardTitle({ boardId: this.idBoard, boardItem: editedBoard }));

    this.showSuccess(Messages.SUCCESS);
    this.isEditEnable = false;
  }

  onCancel(): void {
    this.isEditEnable = false;
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
