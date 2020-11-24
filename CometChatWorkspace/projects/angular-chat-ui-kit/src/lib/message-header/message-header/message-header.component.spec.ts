import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHeaderComponent } from './message-header.component';

describe('MessageHeaderComponent', () => {
  let component: MessageHeaderComponent;
  let fixture: ComponentFixture<MessageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
