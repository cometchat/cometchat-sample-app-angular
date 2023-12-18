import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogHistoryDemoComponent } from './call-log-history-demo.component';

describe('CallLogHistoryDemoComponent', () => {
  let component: CallLogHistoryDemoComponent;
  let fixture: ComponentFixture<CallLogHistoryDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogHistoryDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogHistoryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
