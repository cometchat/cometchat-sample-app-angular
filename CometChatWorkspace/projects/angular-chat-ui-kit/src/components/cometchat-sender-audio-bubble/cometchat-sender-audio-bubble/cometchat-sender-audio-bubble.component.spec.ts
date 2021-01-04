import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderAudioBubbleComponent } from "./cometchat-sender-audio-bubble.component";

describe("SenderAudioBubbleComponent", () => {
  let component: CometchatSenderAudioBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderAudioBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderAudioBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSenderAudioBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
