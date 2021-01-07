import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatGroupWithMessagesComponent } from "./cometchat-group-with-messages.component";

describe("CometchatGroupListScreenComponent", () => {
  let component: CometchatGroupWithMessagesComponent;
  let fixture: ComponentFixture<CometchatGroupWithMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatGroupWithMessagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatGroupWithMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
