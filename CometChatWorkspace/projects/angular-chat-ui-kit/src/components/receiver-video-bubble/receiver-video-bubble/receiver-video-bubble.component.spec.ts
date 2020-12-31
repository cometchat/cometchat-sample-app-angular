import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverVideoBubbleComponent } from './receiver-video-bubble.component';

describe('ReceiverVideoBubbleComponent', () => {
  let component: ReceiverVideoBubbleComponent;
  let fixture: ComponentFixture<ReceiverVideoBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverVideoBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverVideoBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
