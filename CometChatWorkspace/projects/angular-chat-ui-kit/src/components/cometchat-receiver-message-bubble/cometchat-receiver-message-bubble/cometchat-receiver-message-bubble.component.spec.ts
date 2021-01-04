import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverMessageBubbleComponent } from "./cometchat-receiver-message-bubble.component";

describe("CometChatReceiverMessageBubbleComponent", () => {
  let component: CometchatReceiverMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReceiverMessageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
