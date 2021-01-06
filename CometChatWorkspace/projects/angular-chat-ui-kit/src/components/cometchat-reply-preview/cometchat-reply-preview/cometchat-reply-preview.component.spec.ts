import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReplyPreviewComponent } from "./cometchat-reply-preview.component";

describe("ReplyPreviewComponent", () => {
  let component: CometchatReplyPreviewComponent;
  let fixture: ComponentFixture<CometchatReplyPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReplyPreviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReplyPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
