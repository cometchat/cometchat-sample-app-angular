import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverVideoBubbleComponent } from "./cometchat-receiver-video-bubble.component";

describe("ReceiverVideoBubbleComponent", () => {
  let component: CometchatReceiverVideoBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverVideoBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverVideoBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReceiverVideoBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
