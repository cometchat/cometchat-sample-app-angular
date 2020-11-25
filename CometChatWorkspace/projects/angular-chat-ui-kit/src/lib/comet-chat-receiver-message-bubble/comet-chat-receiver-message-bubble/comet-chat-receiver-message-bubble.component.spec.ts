import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometChatReceiverMessageBubbleComponent } from "./comet-chat-receiver-message-bubble.component";

describe("CometChatReceiverMessageBubbleComponent", () => {
  let component: CometChatReceiverMessageBubbleComponent;
  let fixture: ComponentFixture<CometChatReceiverMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometChatReceiverMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatReceiverMessageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
