import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogsWithDetailsDemoComponent } from './call-logs-with-details-demo.component';

describe('CallLogsWithDetailsDemoComponent', () => {
  let component: CallLogsWithDetailsDemoComponent;
  let fixture: ComponentFixture<CallLogsWithDetailsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogsWithDetailsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogsWithDetailsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
