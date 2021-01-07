import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatReceiverFileBubbleComponent } from "./cometchat-receiver-file-bubble.component";

describe("ReceiverFileBubbleComponent", () => {
  let component: CometchatReceiverFileBubbleComponent;
  let fixture: ComponentFixture<CometchatReceiverFileBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatReceiverFileBubbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatReceiverFileBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
