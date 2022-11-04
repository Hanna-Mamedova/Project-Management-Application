import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
  ]
})
export class MaterialModule { }
