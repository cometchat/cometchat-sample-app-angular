import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSmartReplyPreviewComponent } from "./cometchat-smart-reply-preview.component";

describe("ReplyPreviewComponent", () => {
  let component: CometchatSmartReplyPreviewComponent;
  let fixture: ComponentFixture<CometchatSmartReplyPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSmartReplyPreviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSmartReplyPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
