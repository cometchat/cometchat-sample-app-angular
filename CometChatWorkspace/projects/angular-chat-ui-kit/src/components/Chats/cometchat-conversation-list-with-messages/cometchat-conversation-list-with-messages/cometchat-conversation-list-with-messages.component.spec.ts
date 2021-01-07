import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatConversationListWithMessagesComponent } from "./cometchat-conversation-list-with-messages.component";

describe("CometChatConversationListScreenComponent", () => {
  let component: CometchatConversationListWithMessagesComponent;
  let fixture: ComponentFixture<CometchatConversationListWithMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatConversationListWithMessagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatConversationListWithMessagesComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
