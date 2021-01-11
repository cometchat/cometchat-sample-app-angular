import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatMessageThreadComponent } from "./cometchat-message-thread.component";

describe("MessageThreadComponent", () => {
  let component: CometchatMessageThreadComponent;
  let fixture: ComponentFixture<CometchatMessageThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatMessageThreadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatMessageThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
