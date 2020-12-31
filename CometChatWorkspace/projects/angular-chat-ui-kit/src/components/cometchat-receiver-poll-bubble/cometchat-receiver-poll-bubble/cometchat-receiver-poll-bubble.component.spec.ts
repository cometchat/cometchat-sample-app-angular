import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverPollBubbleComponent } from "./cometchat-receiver-poll-bubble.component";

describe("ReceiverPollBubbleComponent", () => {
  let component: CometchatReceiverPollBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverPollBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverPollBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReceiverPollBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
