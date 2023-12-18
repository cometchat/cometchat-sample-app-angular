import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogRecordingsDemoComponent } from './call-log-recordings-demo.component';

describe('CallLogRecordingsDemoComponent', () => {
  let component: CallLogRecordingsDemoComponent;
  let fixture: ComponentFixture<CallLogRecordingsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogRecordingsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogRecordingsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
