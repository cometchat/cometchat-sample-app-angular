import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverStickerMessageBubbleComponent } from "./cometchat-receiver-sticker-message-bubble.component";

describe("ReceiverStickerBubbleComponent", () => {
  let component: CometchatReceiverStickerMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverStickerMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverStickerMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatReceiverStickerMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
