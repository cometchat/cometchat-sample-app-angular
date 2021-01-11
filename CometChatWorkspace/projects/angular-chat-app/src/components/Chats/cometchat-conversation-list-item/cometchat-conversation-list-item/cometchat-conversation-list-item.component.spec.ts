import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatConversationListItemComponent } from "./cometchat-conversation-list-item.component";

describe("ConversationViewComponent", () => {
  let component: CometchatConversationListItemComponent;
  let fixture: ComponentFixture<CometchatConversationListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatConversationListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatConversationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
