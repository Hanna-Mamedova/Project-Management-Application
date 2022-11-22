import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogData } from 'src/app/core/models/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { Messages, TOAST_TIMEOUT } from 'src/app/core/constants/constants';
import { addColumn } from 'src/app/core/store/actions/columns.actions';

@Component({
  selector: 'app-add-column-form',
  templateUrl: './add-column-form.component.html',
  styleUrls: ['./add-column-form.component.scss']
})
export class AddColumnFormComponent implements OnInit {
  addColumnForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addColumnForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  get title() {
    return this.addColumnForm.controls['title'];
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  addColumn(): void {
    this.store.dispatch(addColumn({ column: { title: this.title.value } }));
    this.showSuccess(Messages.COLUMN_CREATED);
  }

}
