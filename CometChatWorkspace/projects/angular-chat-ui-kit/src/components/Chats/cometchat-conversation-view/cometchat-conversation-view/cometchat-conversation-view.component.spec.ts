import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatConversationViewComponent } from "./cometchat-conversation-view.component";

describe("ConversationViewComponent", () => {
  let component: CometchatConversationViewComponent;
  let fixture: ComponentFixture<CometchatConversationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatConversationViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatConversationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
