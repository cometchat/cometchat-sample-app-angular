import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatDeletedMessageBubbleComponent } from "./cometchat-deleted-message-bubble.component";

describe("DeletedMessageBubbleComponent", () => {
  let component: CometchatDeletedMessageBubbleComponent;
  let fixture: ComponentFixture<CometchatDeletedMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatDeletedMessageBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatDeletedMessageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
