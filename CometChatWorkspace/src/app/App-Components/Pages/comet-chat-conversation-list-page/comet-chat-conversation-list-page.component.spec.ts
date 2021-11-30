import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatConversationListPageComponent } from './comet-chat-conversation-list-page.component';

describe('CometChatConversationListPageComponent', () => {
  let component: CometChatConversationListPageComponent;
  let fixture: ComponentFixture<CometChatConversationListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatConversationListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatConversationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
