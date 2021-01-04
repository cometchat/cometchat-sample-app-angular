import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometchatRegularReactionViewComponent } from './cometchat-regular-reaction-view.component';

describe('CometchatRegularReactionViewComponent', () => {
  let component: CometchatRegularReactionViewComponent;
  let fixture: ComponentFixture<CometchatRegularReactionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometchatRegularReactionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatRegularReactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
