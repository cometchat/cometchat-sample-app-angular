import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListScreenPageComponent } from './group-list-screen-page.component';

describe('GroupListScreenPageComponent', () => {
  let component: GroupListScreenPageComponent;
  let fixture: ComponentFixture<GroupListScreenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListScreenPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListScreenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
