import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  //TO DO: to check passing data fromc component
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  newBoardForm: FormGroup = new FormGroup({
    board: new FormControl(
      '',
      [Validators.required, Validators.minLength(1)],
    ),
    description: new FormControl(''),
  });


  onSubmit() {
    // this.login.emit(this.authForm.value as SignDataModel);
    console.log('Hi');

  }
}
