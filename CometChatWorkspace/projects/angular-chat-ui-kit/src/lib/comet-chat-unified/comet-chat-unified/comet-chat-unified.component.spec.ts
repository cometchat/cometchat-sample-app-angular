import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatUnifiedComponent } from './comet-chat-unified.component';

describe('CometChatUnifiedComponent', () => {
  let component: CometChatUnifiedComponent;
  let fixture: ComponentFixture<CometChatUnifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatUnifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatUnifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
