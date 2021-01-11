import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderVideoMessageBubbleComponent } from "./cometchat-sender-video-message-bubble.component";

describe("SenderVideoBubbleComponent", () => {
  let component: CometchatSenderVideoMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderVideoMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderVideoMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatSenderVideoMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
