import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverTextMessageBubbleComponent } from "./cometchat-receiver-text-message-bubble.component";

describe("CometChatReceiverMessageBubbleComponent", () => {
  let component: CometchatReceiverTextMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverTextMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverTextMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatReceiverTextMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
