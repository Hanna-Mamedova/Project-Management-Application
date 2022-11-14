import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardsStateInterface } from 'src/app/core/store/state.models';
import { Store } from '@ngrx/store';
import { addBoard } from 'src/app/core/store/actions/boards.actions';
import { NotificationsService } from 'angular2-notifications';
import { TIMEOUT } from './../../core/constants/constants';
import { Messages } from './../../core/constants/constants';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})

export class CreateBoardComponent implements OnInit {

  newBoardForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<BoardsStateInterface>,
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.newBoardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: '',
    });
  }

  get title() {
    return this.newBoardForm.controls['title'];
  }

  get description() {
    return this.newBoardForm.controls['description'];
  }

  onCreate() {
    this.store.dispatch(addBoard({ boardItem: this.newBoardForm.value }));
    this.notificationsService.success(Messages.SUCCESS, Messages.BOARD_CREATED, { timeOut: TIMEOUT });
  }
}
