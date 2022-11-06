import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-input',
  templateUrl: './title-input.component.html',
  styleUrls: ['./title-input.component.scss'],
})
export class TitleInputComponent {
  isEditEnable: boolean = false;

  @Input()
    title: string;

  onEdit(): void {
    this.isEditEnable = true;
  }

  onSubmit(): void {
    this.isEditEnable = false;
  }

  onCancel(): void {
    this.isEditEnable = false;
  }

}
