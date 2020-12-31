import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverImageBubbleComponent } from "./cometchat-receiver-image-bubble.component";

describe("ReceiverImageBubbleComponent", () => {
  let component: CometchatReceiverImageBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverImageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverImageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReceiverImageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
