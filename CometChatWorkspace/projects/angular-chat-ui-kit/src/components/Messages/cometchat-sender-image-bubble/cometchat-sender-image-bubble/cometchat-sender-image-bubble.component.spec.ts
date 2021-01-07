import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderImageBubbleComponent } from "./cometchat-sender-image-bubble.component";

describe("SenderImageBubbleComponent", () => {
  let component: CometchatSenderImageBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderImageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderImageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSenderImageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
