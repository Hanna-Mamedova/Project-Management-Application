import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Messages, TOAST_TIMEOUT } from 'src/app/core/constants/constants';
import { Column } from 'src/app/core/models/interfaces';
import { editColumn } from 'src/app/core/store/actions/columns.actions';
import { BoardStateInterface } from 'src/app/core/store/state.models';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-title-input',
  templateUrl: './title-input.component.html',
  styleUrls: ['./title-input.component.scss'],
})
export class TitleInputComponent implements OnInit {
  isEditEnable: boolean = false;

  title: string;

  @Input()
    column: Column;

  constructor(
    private store: Store<BoardStateInterface>,
    private toastService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.title = this.column.title;
  }

  onEdit(): void {
    this.isEditEnable = true;
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  onSubmit(id: string): void {

    const editedColumn: Column = {
      title: this.title,
      order: this.column.order,
    };

    this.store.dispatch(editColumn({ columnId: id, editedColumn: editedColumn }));
    this.showSuccess(Messages.COLUMN_EDITED);
    this.isEditEnable = false;
  }

  onCancel(): void {
    this.isEditEnable = false;
  }

}
