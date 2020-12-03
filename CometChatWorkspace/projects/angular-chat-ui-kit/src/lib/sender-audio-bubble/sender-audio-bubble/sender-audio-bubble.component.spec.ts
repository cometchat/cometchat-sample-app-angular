import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderAudioBubbleComponent } from './sender-audio-bubble.component';

describe('SenderAudioBubbleComponent', () => {
  let component: SenderAudioBubbleComponent;
  let fixture: ComponentFixture<SenderAudioBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderAudioBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderAudioBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
