import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatDeleteMessageBubbleComponent } from "./cometchat-delete-message-bubble.component";

describe("DeletedMessageBubbleComponent", () => {
  let component: CometchatDeleteMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatDeleteMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatDeleteMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatDeleteMessageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
