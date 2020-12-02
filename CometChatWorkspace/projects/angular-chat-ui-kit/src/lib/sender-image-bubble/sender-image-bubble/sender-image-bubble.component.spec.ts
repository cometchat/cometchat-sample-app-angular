import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderImageBubbleComponent } from './sender-image-bubble.component';

describe('SenderImageBubbleComponent', () => {
  let component: SenderImageBubbleComponent;
  let fixture: ComponentFixture<SenderImageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderImageBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderImageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
