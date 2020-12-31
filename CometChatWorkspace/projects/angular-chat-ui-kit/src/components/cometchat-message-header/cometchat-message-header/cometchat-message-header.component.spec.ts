import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatMessageHeaderComponent } from "./cometchat-message-header.component";

describe("MessageHeaderComponent", () => {
  let component: CometchatMessageHeaderComponent;
  let fixture: ComponentFixture<CometchatMessageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatMessageHeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatMessageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
