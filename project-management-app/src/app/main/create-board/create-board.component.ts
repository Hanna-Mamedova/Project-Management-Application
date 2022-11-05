import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  newBoardForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    //TO DO: to check passing data fromc component
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { };

  ngOnInit(): void {
    this.newBoardForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  };

  onCreate() {
    // this.onAdd.emit(this.newBoardForm.value as Board);
    console.log(this.newBoardForm.value);
  }
}