import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverImageMessageBubbleComponent } from "./cometchat-receiver-image-message-bubble.component";

describe("ReceiverImageBubbleComponent", () => {
  let component: CometchatReceiverImageMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverImageMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverImageMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatReceiverImageMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
