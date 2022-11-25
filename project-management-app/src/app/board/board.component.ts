import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { editBoardTitle, getBoard } from '../core/store/actions/boards.actions';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subscription } from 'rxjs';
import { selectBoard, selectColumns, selectSearchedColumns } from '../core/store/selectors/boards.selectors';
import { BoardStateInterface } from '../core/store/state.models';
import { Board, Column } from '../core/models/interfaces';
import { sortColumns } from '../core/store/actions/columns.actions';
import { Messages, TOAST_TIMEOUT } from '../core/constants/constants';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddColumnFormComponent } from './components/add-column-form/add-column-form.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})

export class BoardComponent implements OnInit, AfterViewInit, OnDestroy {
  isEditEnable: boolean = false;

  board$ = this.store.select(selectBoard);

  columns$ = this.store.select(selectColumns);

  columnIds$ = this.columns$.pipe(map((columns) => columns.map((column: Column) => column.id!)));

  board: Board;

  newTitle: string;

  titleBoardControlForm: FormGroup;

  sub = new Subscription();

  @ViewChild('input') input: ElementRef;

  @Input('formControlName')
  title: string;

  constructor(
    private store: Store<BoardStateInterface>,
    private toastService: NotificationsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
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
      title: [this.newTitle, [Validators.required]],
    });

  }

  get titleBoardControl() {
    return this.titleBoardControlForm.controls['title'];
  }

  get first(): any {
    return this.titleBoardControlForm.get('title');
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
      },
    }));

    this.showSuccess(Messages.SUCCESS);
    this.isEditEnable = false;
  }

  onCancel(): void {
    this.isEditEnable = false;
    this.titleBoardControlForm.reset({ title: this.board.title });

  }

  public dropGrid(event: CdkDragDrop<Column[] | null>) {
    this.store.dispatch(sortColumns({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    }));
  }

  openaddColumnModal(): void {
    this.dialog.open(AddColumnFormComponent);
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
