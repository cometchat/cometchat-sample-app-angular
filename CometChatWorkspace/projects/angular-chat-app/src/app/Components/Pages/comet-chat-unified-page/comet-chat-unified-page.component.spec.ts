import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CometChatUnifiedPageComponent } from './comet-chat-unified-page.component';

describe('CometChatUnifiedPageComponent', () => {
  let component: CometChatUnifiedPageComponent;
  let fixture: ComponentFixture<CometChatUnifiedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CometChatUnifiedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatUnifiedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
