import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss']
})
export class CloseBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  delete(): void {
    console.log('TASK DELETED');
    // remove from list
    // delete from server
  }

}
