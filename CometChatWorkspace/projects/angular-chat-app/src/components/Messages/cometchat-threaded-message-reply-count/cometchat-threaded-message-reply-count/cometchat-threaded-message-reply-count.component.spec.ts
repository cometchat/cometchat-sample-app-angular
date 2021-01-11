import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatThreadedMessageReplyCountComponent } from "./cometchat-threaded-message-reply-count.component";

describe("ReplyCountComponent", () => {
  let component: CometchatThreadedMessageReplyCountComponent;
  let fixture: ComponentFixture<CometchatThreadedMessageReplyCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatThreadedMessageReplyCountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatThreadedMessageReplyCountComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
