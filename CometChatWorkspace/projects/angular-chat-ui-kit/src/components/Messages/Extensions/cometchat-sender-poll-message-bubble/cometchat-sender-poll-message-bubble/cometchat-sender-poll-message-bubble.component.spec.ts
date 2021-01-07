import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderPollMessageBubbleComponent } from "./cometchat-sender-poll-message-bubble.component";

describe("SenderPollBubbleComponent", () => {
  let component: CometchatSenderPollMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderPollMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderPollMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatSenderPollMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
