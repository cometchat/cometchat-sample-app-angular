import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatUserDetailComponent } from './comet-chat-user-detail.component';

describe('CometChatUserDetailComponent', () => {
  let component: CometChatUserDetailComponent;
  let fixture: ComponentFixture<CometChatUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
