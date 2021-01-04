import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverAudioBubbleComponent } from "./cometchat-receiver-audio-bubble.component";

describe("ReceiverAudioBubbleComponent", () => {
  let component: CometchatReceiverAudioBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverAudioBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverAudioBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReceiverAudioBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
