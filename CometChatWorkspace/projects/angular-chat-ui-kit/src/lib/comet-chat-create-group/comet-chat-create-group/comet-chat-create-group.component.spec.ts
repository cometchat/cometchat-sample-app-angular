import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatCreateGroupComponent } from './comet-chat-create-group.component';

describe('CometChatCreateGroupComponent', () => {
  let component: CometChatCreateGroupComponent;
  let fixture: ComponentFixture<CometChatCreateGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatCreateGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
