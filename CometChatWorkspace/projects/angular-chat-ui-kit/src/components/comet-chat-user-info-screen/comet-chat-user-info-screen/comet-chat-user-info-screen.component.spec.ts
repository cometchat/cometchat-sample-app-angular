import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatUserInfoScreenComponent } from './comet-chat-user-info-screen.component';

describe('CometChatUserInfoScreenComponent', () => {
  let component: CometChatUserInfoScreenComponent;
  let fixture: ComponentFixture<CometChatUserInfoScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatUserInfoScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatUserInfoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
