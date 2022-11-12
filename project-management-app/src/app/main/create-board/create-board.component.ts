import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardsStateInterface } from 'src/app/core/store/state.models';
import { Store } from '@ngrx/store';
import { addBoardFormSubmitted } from 'src/app/core/store/actions/boards.actions';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {

  newBoardForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    //TO DO: to check passing data fromc component
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<BoardsStateInterface>,
  ) { }

  ngOnInit(): void {
    this.newBoardForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  onCreate() {
    //TO DO: temporary log
    console.log(this.newBoardForm.value);
    this.store.dispatch(addBoardFormSubmitted({ boardItem: this.newBoardForm.value }));
  }
}
