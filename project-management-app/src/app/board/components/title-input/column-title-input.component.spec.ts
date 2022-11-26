import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTitleInputComponent } from './column-title-input.component';

describe('ColumnTitleInputComponent', () => {
  let component: ColumnTitleInputComponent;
  let fixture: ComponentFixture<ColumnTitleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnTitleInputComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ColumnTitleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
