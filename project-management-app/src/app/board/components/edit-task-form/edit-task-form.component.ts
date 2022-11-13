import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { editTask } from 'src/app/core/store/actions/tasks.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

const MIN_LENGTH = 3;

interface DialogData {
  columnId: string,
}

interface EditTaskRequest {
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
}

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {
  editTaskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editTaskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(MIN_LENGTH)]],
      description: ['', [Validators.required]],
    });
  }

  get title() {
    return this.editTaskForm.controls['title'];
  }

  get description() {
    return this.editTaskForm.controls['description'];
  }

  editTask(): void {
    const currentUserId = localStorage.getItem('userId')!;

    // const editedTask: EditTaskRequest = {
    //   title: this.title.value,
    //   order: this.data
    //   description: this.description.value,
    //   userId: currentUserId,
    //   boardId: ,
    //   columnId: this.data.columnId,
    // };

    // this.store.dispatch(editTask({ columnId: this.columnId, task: editedTask }));
  }

}
