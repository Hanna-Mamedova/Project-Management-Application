import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardStateInterface } from 'src/app/core/store/state.models';
import { NotificationsService } from 'angular2-notifications';
import { editBoard } from 'src/app/core/store/actions/boards.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/core/models/interfaces';
import { TOAST_TIMEOUT, Messages } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.scss'],
})
export class UpdateBoardComponent implements OnInit {

  updateBoardForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<BoardStateInterface>,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: {
      board: Board;
    },
  ) { }

  ngOnInit(): void {
    this.updateBoardForm = this.formBuilder.group({
      title: [this.data.board.title, [Validators.required]],
      description: [this.data.board.description],
    });
  }

  onUpdate(): void {
    this.store.dispatch(editBoard({ boardId: this.data.board.id!, boardItem: this.updateBoardForm.value }));

    this.notificationsService.success(Messages.SUCCESS, Messages.BOARD_EDITED, { timeOut: TOAST_TIMEOUT });
  }
}
