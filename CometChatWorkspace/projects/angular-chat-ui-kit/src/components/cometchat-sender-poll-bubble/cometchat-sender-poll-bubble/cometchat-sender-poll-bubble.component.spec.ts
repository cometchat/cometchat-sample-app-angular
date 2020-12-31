import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderPollBubbleComponent } from "./cometchat-sender-poll-bubble.component";

describe("SenderPollBubbleComponent", () => {
  let component: CometchatSenderPollBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderPollBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderPollBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSenderPollBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
