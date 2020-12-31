import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometchatGroupListScreenComponent } from './cometchat-group-list-screen.component';

describe('CometchatGroupListScreenComponent', () => {
  let component: CometchatGroupListScreenComponent;
  let fixture: ComponentFixture<CometchatGroupListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometchatGroupListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatGroupListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
