import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderStickerMessageBubbleComponent } from "./cometchat-sender-sticker-message-bubble.component";

describe("SenderStickerBubbleComponent", () => {
  let component: CometchatSenderStickerMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderStickerMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderStickerMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatSenderStickerMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
