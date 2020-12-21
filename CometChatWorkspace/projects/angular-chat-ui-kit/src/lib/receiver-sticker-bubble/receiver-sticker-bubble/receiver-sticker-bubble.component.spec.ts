import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverStickerBubbleComponent } from './receiver-sticker-bubble.component';

describe('ReceiverStickerBubbleComponent', () => {
  let component: ReceiverStickerBubbleComponent;
  let fixture: ComponentFixture<ReceiverStickerBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverStickerBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverStickerBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
