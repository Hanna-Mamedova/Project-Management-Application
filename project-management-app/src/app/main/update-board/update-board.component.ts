import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.scss']
})
export class UpdateBoardComponent implements OnInit {

  updateBoardForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    //TO DO: to check passing data fromc component
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.updateBoardForm = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  onUpdate() {
    //TO DO: temporary log
    console.log(this.updateBoardForm.value);
  }

}
