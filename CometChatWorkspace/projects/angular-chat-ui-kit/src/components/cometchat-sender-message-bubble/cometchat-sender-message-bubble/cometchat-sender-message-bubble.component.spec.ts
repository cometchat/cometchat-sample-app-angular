import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderMessageBubbleComponent } from "./cometchat-sender-message-bubble.component";

describe("CometChatSenderMessageBubbleComponent", () => {
  let component: CometchatSenderMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSenderMessageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
