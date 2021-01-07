import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverAudioMessageBubbleComponent } from "./cometchat-receiver-audio-message-bubble.component";

describe("ReceiverAudioBubbleComponent", () => {
  let component: CometchatReceiverAudioMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverAudioMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverAudioMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatReceiverAudioMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
