import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverPollMessageBubbleComponent } from "./cometchat-receiver-poll-message-bubble.component";

describe("ReceiverPollBubbleComponent", () => {
  let component: CometchatReceiverPollMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverPollMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverPollMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatReceiverPollMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
