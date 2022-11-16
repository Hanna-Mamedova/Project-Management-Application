import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MODAL_WIDTH } from '../constants/constants';
import { DialogData } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(enterAnimationDuration: string, exitAnimationDuration: string, data: DialogData): void {
    this.dialog.open(DialogComponent, {
      width: MODAL_WIDTH,
      enterAnimationDuration,
      exitAnimationDuration,
      data,
    });
  }
}
