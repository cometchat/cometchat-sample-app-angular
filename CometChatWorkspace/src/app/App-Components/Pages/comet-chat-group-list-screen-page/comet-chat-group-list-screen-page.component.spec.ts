import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatGroupListScreenPageComponent } from './comet-chat-group-list-screen-page.component';

describe('CometChatGroupListScreenPageComponent', () => {
  let component: CometChatGroupListScreenPageComponent;
  let fixture: ComponentFixture<CometChatGroupListScreenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatGroupListScreenPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatGroupListScreenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
