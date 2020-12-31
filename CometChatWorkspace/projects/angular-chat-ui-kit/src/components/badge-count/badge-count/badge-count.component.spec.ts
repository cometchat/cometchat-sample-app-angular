import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeCountComponent } from './badge-count.component';

describe('BadgeCountComponent', () => {
  let component: BadgeCountComponent;
  let fixture: ComponentFixture<BadgeCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
