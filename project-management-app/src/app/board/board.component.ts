import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { editBoardTitle, getBoard } from '../core/store/actions/boards.actions';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subscription } from 'rxjs';
import { selectBoard, selectColumns, selectSearchedColumns } from '../core/store/selectors/boards.selectors';
import { BoardStateInterface } from '../core/store/state.models';
import { Board, Column } from '../core/models/interfaces';
import { addColumn, sortColumns } from '../core/store/actions/columns.actions';
import { COLUMN_CREATED_TITLE, Messages, TOAST_TIMEOUT } from '../core/constants/constants';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})

export class BoardComponent implements OnInit, AfterViewInit, OnDestroy, OnDestroy {
  isEditEnable: boolean = false;

  board$ = this.store.select(selectBoard);
  columns$ = this.store.select(selectColumns);

  columnIds$ = this.columns$.pipe(map((columns) => columns.map((column: Column) => column.id!)));

  board: Board;

  newTitle: string;

  titleBoardControlForm: FormGroup;

  sub = new Subscription();

  @ViewChild('input') input: ElementRef;

  constructor(
    private store: Store<BoardStateInterface>,
    private toastService: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.sub.add(this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.store.dispatch(getBoard({ boardId: queryParams['id'] }));
    }));
    this.showSuccess(Messages.BOARD_LOADED);

    this.sub.add(this.board$.subscribe((data) => {
      this.board = data.board;
      this.newTitle = data.board.title;
    }));

    this.titleBoardControlForm = this.formBuilder.group({
      title: [this.newTitle, [Validators.required]]
    });
  }

  get titleBoardControl() {
    return this.titleBoardControlForm.controls['title'];
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  onEditBoardTitle(): void {
    this.isEditEnable = true;
  }

  onSubmitTitleBoard(): void {
    this.store.dispatch(editBoardTitle({
      boardId: this.board.id!, boardItem: {
        title: this.titleBoardControl.value,
        description: this.board.description,
      }
    }));

    this.showSuccess(Messages.SUCCESS);
    this.isEditEnable = false;
  }

  onCancel(): void {
    this.newTitle = this.board.title;
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

  ngAfterViewInit(): void {
    this.sub.add(fromEvent(this.input.nativeElement, 'keyup').pipe(
      filter(Boolean),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(() => this.columns$ = this.store.select(selectSearchedColumns(this.input.nativeElement.value.toLowerCase()))));
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
