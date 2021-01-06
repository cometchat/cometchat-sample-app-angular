import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderStickerBubbleComponent } from "./cometchat-sender-sticker-bubble.component";

describe("SenderStickerBubbleComponent", () => {
  let component: CometchatSenderStickerBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderStickerBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderStickerBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSenderStickerBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
