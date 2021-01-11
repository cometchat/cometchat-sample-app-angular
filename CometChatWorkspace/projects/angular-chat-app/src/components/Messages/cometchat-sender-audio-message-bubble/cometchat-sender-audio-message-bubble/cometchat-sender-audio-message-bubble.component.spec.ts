import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderAudioMessageBubbleComponent } from "./cometchat-sender-audio-message-bubble.component";

describe("SenderAudioBubbleComponent", () => {
  let component: CometchatSenderAudioMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderAudioMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderAudioMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatSenderAudioMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
