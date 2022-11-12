import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const MIN_LENGTH = 3;

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent implements OnInit {
  addTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addTaskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(MIN_LENGTH)]],
      description: ['', [Validators.required]],
    });
  }

  get title() {
    return this.addTaskForm.controls['title'];
  }

  get description() {
    return this.addTaskForm.controls['description'];
  }

  addTask(): void {
    console.log('FORM DATA');
  }

}
