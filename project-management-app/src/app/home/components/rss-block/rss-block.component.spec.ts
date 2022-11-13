import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssBlockComponent } from './rss-block.component';

describe('RssBlockComponent', () => {
  let component: RssBlockComponent;
  let fixture: ComponentFixture<RssBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RssBlockComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RssBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
