import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogsComponent } from './call-logs.component';

describe('CallLogsComponent', () => {
  let component: CallLogsComponent;
  let fixture: ComponentFixture<CallLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
