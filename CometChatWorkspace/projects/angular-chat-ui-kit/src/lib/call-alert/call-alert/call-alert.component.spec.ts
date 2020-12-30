import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallAlertComponent } from './call-alert.component';

describe('CallAlertComponent', () => {
  let component: CallAlertComponent;
  let fixture: ComponentFixture<CallAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
