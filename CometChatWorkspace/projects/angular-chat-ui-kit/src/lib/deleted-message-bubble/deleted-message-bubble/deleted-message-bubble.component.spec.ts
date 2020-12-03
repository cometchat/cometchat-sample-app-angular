import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedMessageBubbleComponent } from './deleted-message-bubble.component';

describe('DeletedMessageBubbleComponent', () => {
  let component: DeletedMessageBubbleComponent;
  let fixture: ComponentFixture<DeletedMessageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedMessageBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedMessageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
