import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatConversationListComponent } from "./cometchat-conversation-list.component";

describe("CometChatConversationListComponent", () => {
  let component: CometchatConversationListComponent;
  let fixture: ComponentFixture<CometchatConversationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatConversationListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatConversationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
