import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerBubbleDemoComponent } from './scheduler-bubble-demo.component';

describe('SchedulerBubbleDemoComponent', () => {
  let component: SchedulerBubbleDemoComponent;
  let fixture: ComponentFixture<SchedulerBubbleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchedulerBubbleDemoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerBubbleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
