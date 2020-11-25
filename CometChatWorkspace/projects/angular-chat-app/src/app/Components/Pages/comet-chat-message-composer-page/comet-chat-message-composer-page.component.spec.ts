import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatMessageComposerPageComponent } from './comet-chat-message-composer-page.component';

describe('CometChatMessageComposerPageComponent', () => {
  let component: CometChatMessageComposerPageComponent;
  let fixture: ComponentFixture<CometChatMessageComposerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatMessageComposerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatMessageComposerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
