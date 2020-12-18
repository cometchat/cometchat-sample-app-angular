import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderPollBubbleComponent } from './sender-poll-bubble.component';

describe('SenderPollBubbleComponent', () => {
  let component: SenderPollBubbleComponent;
  let fixture: ComponentFixture<SenderPollBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderPollBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderPollBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
