import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsDemoComponent } from './chats-demo.component';

describe('ChatsDemoComponent', () => {
  let component: ChatsDemoComponent;
  let fixture: ComponentFixture<ChatsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
