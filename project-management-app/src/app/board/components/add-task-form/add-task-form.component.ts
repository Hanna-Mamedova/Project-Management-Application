import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/core/store/actions/tasks.actions';
import { AddTaskRequest } from 'src/app/core/models/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

const MIN_LENGTH = 3;

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

  addTask(): void {
    const currentUserId = localStorage.getItem('userId')!;

    const createdTask: AddTaskRequest = {
      title: this.title.value,
      description: this.description.value,
      userId: currentUserId,
    };

    this.store.dispatch(addTask({ columnId: this.data.columnId, task: createdTask }));
  }

}
