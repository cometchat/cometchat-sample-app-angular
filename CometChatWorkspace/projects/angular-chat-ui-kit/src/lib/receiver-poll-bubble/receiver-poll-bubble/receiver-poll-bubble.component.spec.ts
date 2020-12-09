import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverPollBubbleComponent } from './receiver-poll-bubble.component';

describe('ReceiverPollBubbleComponent', () => {
  let component: ReceiverPollBubbleComponent;
  let fixture: ComponentFixture<ReceiverPollBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverPollBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverPollBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
