import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverImageBubbleComponent } from './receiver-image-bubble.component';

describe('ReceiverImageBubbleComponent', () => {
  let component: ReceiverImageBubbleComponent;
  let fixture: ComponentFixture<ReceiverImageBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverImageBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverImageBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
