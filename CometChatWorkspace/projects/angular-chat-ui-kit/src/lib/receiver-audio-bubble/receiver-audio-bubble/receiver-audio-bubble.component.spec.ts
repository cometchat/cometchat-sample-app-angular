import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverAudioBubbleComponent } from './receiver-audio-bubble.component';

describe('ReceiverAudioBubbleComponent', () => {
  let component: ReceiverAudioBubbleComponent;
  let fixture: ComponentFixture<ReceiverAudioBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverAudioBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverAudioBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
