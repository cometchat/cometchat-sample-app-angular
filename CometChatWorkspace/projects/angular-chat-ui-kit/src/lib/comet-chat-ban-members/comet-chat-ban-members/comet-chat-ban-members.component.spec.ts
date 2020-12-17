import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatBanMembersComponent } from './comet-chat-ban-members.component';

describe('CometChatBanMembersComponent', () => {
  let component: CometChatBanMembersComponent;
  let fixture: ComponentFixture<CometChatBanMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatBanMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatBanMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
