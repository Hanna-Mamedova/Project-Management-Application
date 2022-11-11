import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/core/models/interfaces';
import { editColumn } from 'src/app/core/store/actions/columns.actions';
import { BoardStateInterface } from 'src/app/core/store/state.models';

@Component({
  selector: 'app-title-input',
  templateUrl: './title-input.component.html',
  styleUrls: ['./title-input.component.scss'],
})
export class TitleInputComponent implements OnInit {
  isEditEnable: boolean = false;

  title: string;

  @Input()
    column: Column;

  constructor(private store: Store<BoardStateInterface>) {}

  ngOnInit(): void {
    this.title = this.column.title;
  }

  onEdit(): void {
    this.isEditEnable = true;
  }

  onSubmit(id: string): void {

    const editedColumn: Column = {
      title: this.title,
      order: this.column.order,
    };

    this.store.dispatch(editColumn({ columnId: id, editedColumn: editedColumn }));
    this.isEditEnable = false;
  }

  onCancel(): void {
    this.isEditEnable = false;
  }

}
