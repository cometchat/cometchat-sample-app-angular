import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometchatUserListScreenComponent } from './cometchat-user-list-screen.component';

describe('CometchatUserListScreenComponent', () => {
  let component: CometchatUserListScreenComponent;
  let fixture: ComponentFixture<CometchatUserListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometchatUserListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatUserListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
