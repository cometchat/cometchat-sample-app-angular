import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverFileMessageBubbleComponent } from "./cometchat-receiver-file-message-bubble.component";

describe("ReceiverFileBubbleComponent", () => {
  let component: CometchatReceiverFileMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverFileMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverFileMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatReceiverFileMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
