import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderStickerBubbleComponent } from './sender-sticker-bubble.component';

describe('SenderStickerBubbleComponent', () => {
  let component: SenderStickerBubbleComponent;
  let fixture: ComponentFixture<SenderStickerBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderStickerBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderStickerBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
