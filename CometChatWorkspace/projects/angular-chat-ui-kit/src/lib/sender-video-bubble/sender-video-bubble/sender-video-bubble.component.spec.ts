import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderVideoBubbleComponent } from './sender-video-bubble.component';

describe('SenderVideoBubbleComponent', () => {
  let component: SenderVideoBubbleComponent;
  let fixture: ComponentFixture<SenderVideoBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderVideoBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderVideoBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
