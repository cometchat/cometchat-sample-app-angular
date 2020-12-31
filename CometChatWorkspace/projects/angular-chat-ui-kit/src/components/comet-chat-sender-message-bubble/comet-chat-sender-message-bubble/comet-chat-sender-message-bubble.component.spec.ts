import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatSenderMessageBubbleComponent } from './comet-chat-sender-message-bubble.component';

describe('CometChatSenderMessageBubbleComponent', () => {
  let component: CometChatSenderMessageBubbleComponent;
  let fixture: ComponentFixture<CometChatSenderMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatSenderMessageBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatSenderMessageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
