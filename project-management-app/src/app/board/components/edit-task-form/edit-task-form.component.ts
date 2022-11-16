import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { editTask } from 'src/app/core/store/actions/tasks.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTaskRequest, Task } from 'src/app/core/models/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface DialogData {
  targetTask: Task,
  columnId: string,
}

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss'],
})
export class EditTaskFormComponent implements OnInit, OnDestroy {
  editTaskForm: FormGroup;

  boardId: string;

  sub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  get title() {
    return this.editTaskForm.controls['title'];
  }

  get description() {
    return this.editTaskForm.controls['description'];
  }

  editTask(): void {
    this.sub = this.activatedRoute.queryParams.subscribe((queryParams) => this.boardId = queryParams['id']);

    const editedTask: EditTaskRequest = {
      title: this.title.value,
      order: this.data.targetTask.order!,
      description: this.description.value,
      userId: this.data.targetTask.userId!,
      boardId: this.boardId,
      columnId: this.data.columnId,
    };

    this.store.dispatch(editTask({ taskId: this.data.targetTask.id!, task: editedTask }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
