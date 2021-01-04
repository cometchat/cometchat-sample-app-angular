import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometchatViewMembersComponent } from './cometchat-view-members.component';

describe('CometchatViewMembersComponent', () => {
  let component: CometchatViewMembersComponent;
  let fixture: ComponentFixture<CometchatViewMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometchatViewMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatViewMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
