import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderTextMessageBubbleComponent } from "./cometchat-sender-text-message-bubble.component";

describe("CometChatSenderMessageBubbleComponent", () => {
  let component: CometchatSenderTextMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderTextMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderTextMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatSenderTextMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
