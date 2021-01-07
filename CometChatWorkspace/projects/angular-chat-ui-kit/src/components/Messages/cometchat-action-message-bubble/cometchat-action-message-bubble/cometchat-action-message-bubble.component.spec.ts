import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatActionMessageBubbleComponent } from "./cometchat-action-message-bubble.component";

describe("CallMessageComponent", () => {
  let component: CometchatActionMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatActionMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatActionMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatActionMessageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
