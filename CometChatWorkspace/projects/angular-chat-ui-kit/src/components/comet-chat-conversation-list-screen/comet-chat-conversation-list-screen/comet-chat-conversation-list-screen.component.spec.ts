import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatConversationListScreenComponent } from './comet-chat-conversation-list-screen.component';

describe('CometChatConversationListScreenComponent', () => {
  let component: CometChatConversationListScreenComponent;
  let fixture: ComponentFixture<CometChatConversationListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatConversationListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatConversationListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
