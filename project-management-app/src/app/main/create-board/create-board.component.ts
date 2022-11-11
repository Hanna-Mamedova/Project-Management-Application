import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, switchMap } from 'rxjs';
import { BoardRequestService } from './../../core/services/boards/board-request.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit, OnDestroy {

  newBoardForm: FormGroup;
  sub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private boardRequestService: BoardRequestService,
    //TO DO: to check passing data fromc component
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.newBoardForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  };


  onCreate(): void {
    this.sub = this.boardRequestService.createBoard(this.newBoardForm.value)
      .pipe(switchMap(() => {
        return this.boardRequestService.getBoards();
      }))
      .subscribe(() => { });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}