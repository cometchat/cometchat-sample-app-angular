import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderFileMessageBubbleComponent } from "./cometchat-sender-file-message-bubble.component";

describe("SenderFileBubbleComponent", () => {
  let component: CometchatSenderFileMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderFileMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderFileMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatSenderFileMessageBubbleComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
