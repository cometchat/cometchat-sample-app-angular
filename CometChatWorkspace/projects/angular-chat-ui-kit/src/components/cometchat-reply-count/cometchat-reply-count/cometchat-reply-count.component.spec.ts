import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReplyCountComponent } from "./cometchat-reply-count.component";

describe("ReplyCountComponent", () => {
  let component: CometchatReplyCountComponent;
  let fixture: ComponentFixture<CometchatReplyCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReplyCountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReplyCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
