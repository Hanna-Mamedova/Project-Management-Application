import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
  ]
})
export class MaterialModule { }
