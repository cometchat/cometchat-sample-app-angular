import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberViewComponent } from './add-member-view.component';

describe('AddMemberViewComponent', () => {
  let component: AddMemberViewComponent;
  let fixture: ComponentFixture<AddMemberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
