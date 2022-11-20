import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/core/store/actions/tasks.actions';
import { AddTaskRequest } from 'src/app/core/models/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { Messages, TOAST_TIMEOUT } from 'src/app/core/constants/constants';

interface DialogData {
  columnId: string,
}

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent implements OnInit {
  addTaskForm: FormGroup;

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
    this.addTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  get title() {
    return this.addTaskForm.controls['title'];
  }

  get description() {
    return this.addTaskForm.controls['description'];
  }

  showSuccess(message: string): void {
    this.toastService.success(Messages.SUCCESS, message, { timeOut: TOAST_TIMEOUT });
  }

  addTask(): void {
    const currentUserId = localStorage.getItem('userId')!;

    const createdTask: AddTaskRequest = {
      title: this.title.value,
      description: this.description.value,
      userId: currentUserId,
    };

    this.store.dispatch(addTask({ columnId: this.data.columnId, task: createdTask }));
    this.showSuccess(Messages.TASK_CREATED);
  }

}
