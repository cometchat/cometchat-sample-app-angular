import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderVideoBubbleComponent } from "./cometchat-sender-video-bubble.component";

describe("SenderVideoBubbleComponent", () => {
  let component: CometchatSenderVideoBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderVideoBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderVideoBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSenderVideoBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
