import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogParticipantsDemoComponent } from './call-log-participants-demo.component';

describe('CallLogParticipantsDemoComponent', () => {
  let component: CallLogParticipantsDemoComponent;
  let fixture: ComponentFixture<CallLogParticipantsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogParticipantsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogParticipantsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
