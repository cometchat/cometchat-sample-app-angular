import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatUserListWithMessagesComponent } from "./cometchat-user-list-with-messages.component";

describe("CometchatUserListScreenComponent", () => {
  let component: CometchatUserListWithMessagesComponent;
  let fixture: ComponentFixture<CometchatUserListWithMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatUserListWithMessagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatUserListWithMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
