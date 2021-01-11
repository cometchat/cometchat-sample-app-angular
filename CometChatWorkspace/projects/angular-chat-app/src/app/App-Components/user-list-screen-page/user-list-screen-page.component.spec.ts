import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListScreenPageComponent } from './user-list-screen-page.component';

describe('UserListScreenPageComponent', () => {
  let component: UserListScreenPageComponent;
  let fixture: ComponentFixture<UserListScreenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListScreenPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListScreenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
