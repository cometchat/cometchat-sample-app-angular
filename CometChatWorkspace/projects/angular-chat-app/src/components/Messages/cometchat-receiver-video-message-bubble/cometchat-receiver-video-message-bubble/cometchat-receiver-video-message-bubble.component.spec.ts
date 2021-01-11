import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverVideoMessageBubbleComponent } from "./cometchat-receiver-video-message-bubble.component";

describe("ReceiverVideoBubbleComponent", () => {
  let component: CometchatReceiverVideoMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverVideoMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverVideoMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatReceiverVideoMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
