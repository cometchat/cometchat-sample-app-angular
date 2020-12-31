import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverStickerBubbleComponent } from "./cometchat-receiver-sticker-bubble.component";

describe("ReceiverStickerBubbleComponent", () => {
  let component: CometchatReceiverStickerBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverStickerBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverStickerBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReceiverStickerBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
