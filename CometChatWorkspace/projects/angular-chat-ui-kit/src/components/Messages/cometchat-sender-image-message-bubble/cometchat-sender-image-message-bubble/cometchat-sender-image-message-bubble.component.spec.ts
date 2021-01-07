import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderImageMessageBubbleComponent } from "./cometchat-sender-image-message-bubble.component";

describe("SenderImageBubbleComponent", () => {
  let component: CometchatSenderImageMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderImageMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderImageMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatSenderImageMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
