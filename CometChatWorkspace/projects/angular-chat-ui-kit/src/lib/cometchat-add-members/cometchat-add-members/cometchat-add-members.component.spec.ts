import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometchatAddMembersComponent } from './cometchat-add-members.component';

describe('CometchatAddMembersComponent', () => {
  let component: CometchatAddMembersComponent;
  let fixture: ComponentFixture<CometchatAddMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometchatAddMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatAddMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
