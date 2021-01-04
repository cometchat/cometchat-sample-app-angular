import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSenderFileBubbleComponent } from "./cometchat-sender-file-bubble.component";

describe("SenderFileBubbleComponent", () => {
  let component: CometchatSenderFileBubbleComponent;
  let fixture: ComponentFixture<CometchatSenderFileBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSenderFileBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSenderFileBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
