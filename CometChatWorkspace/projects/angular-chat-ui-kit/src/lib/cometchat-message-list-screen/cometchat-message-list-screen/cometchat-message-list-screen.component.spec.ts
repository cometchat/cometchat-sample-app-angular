import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometchatMessageListScreenComponent } from './cometchat-message-list-screen.component';

describe('CometchatMessageListScreenComponent', () => {
  let component: CometchatMessageListScreenComponent;
  let fixture: ComponentFixture<CometchatMessageListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometchatMessageListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatMessageListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
