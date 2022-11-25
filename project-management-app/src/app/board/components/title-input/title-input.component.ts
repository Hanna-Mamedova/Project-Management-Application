import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Messages, TOAST_TIMEOUT } from 'src/app/core/constants/constants';
import { Column } from 'src/app/core/models/interfaces';
import { editColumn } from 'src/app/core/store/actions/columns.actions';
import { BoardStateInterface } from 'src/app/core/store/state.models';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-title-input',
  templateUrl: './title-input.component.html',
  styleUrls: ['./title-input.component.scss'],
})
export class TitleInputComponent implements OnInit {
  isEditEnable: boolean = false;

  titleControlForm: FormGroup;

  @Input()
    column: Column;

  title: string;

  constructor(
    private store: Store<BoardStateInterface>,
    private toastService: NotificationsService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.title = this.column.title;

    this.titleControlForm = this.formBuilder.group({
      title: [this.column.title, [Validators.required]],
    });
  }

  get titleControl() {
    return this.titleControlForm.controls['title'];
  }

  onEdit(): void {
    this.isEditEnable = true;
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  onSubmit(id: string): void {
    const editedTitle: string = this.titleControlForm.value.title;

    const editedColumn: Column = {
      title: editedTitle,
      order: this.column.order,
    };

    this.store.dispatch(editColumn({ columnId: id, editedColumn: editedColumn }));
    this.showSuccess(Messages.COLUMN_EDITED);
    this.isEditEnable = false;
  }

  onCancel(): void {
    this.isEditEnable = false;
    this.titleControlForm.reset({ title: this.column.title });
  }

}
