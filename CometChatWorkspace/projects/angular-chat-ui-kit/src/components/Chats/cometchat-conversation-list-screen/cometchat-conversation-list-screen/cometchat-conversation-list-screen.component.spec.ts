import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatConversationListScreenComponent } from "./cometchat-conversation-list-screen.component";

describe("CometChatConversationListScreenComponent", () => {
  let component: CometchatConversationListScreenComponent;
  let fixture: ComponentFixture<CometchatConversationListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatConversationListScreenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatConversationListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
