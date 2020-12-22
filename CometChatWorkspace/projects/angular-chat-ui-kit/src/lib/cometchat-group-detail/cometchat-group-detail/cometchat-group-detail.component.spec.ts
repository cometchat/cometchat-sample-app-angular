import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometchatGroupDetailComponent } from './cometchat-group-detail.component';

describe('CometchatGroupDetailComponent', () => {
  let component: CometchatGroupDetailComponent;
  let fixture: ComponentFixture<CometchatGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometchatGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
