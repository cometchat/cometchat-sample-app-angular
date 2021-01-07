import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatMessagesComponent } from "./cometchat-messages.component";

describe("CometchatMessageListScreenComponent", () => {
  let component: CometchatMessagesComponent;
  let fixture: ComponentFixture<CometchatMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatMessagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
