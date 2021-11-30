import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatConversationListScreenPageComponent } from './comet-chat-conversation-list-screen-page.component';

describe('CometChatConversationListScreenPageComponent', () => {
  let component: CometChatConversationListScreenPageComponent;
  let fixture: ComponentFixture<CometChatConversationListScreenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatConversationListScreenPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatConversationListScreenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
