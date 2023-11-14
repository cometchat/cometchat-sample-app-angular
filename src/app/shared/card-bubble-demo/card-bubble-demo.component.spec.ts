import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBubbleDemoComponent } from './card-bubble-demo.component';

describe('CardBubbleDemoComponent', () => {
  let component: CardBubbleDemoComponent;
  let fixture: ComponentFixture<CardBubbleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBubbleDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBubbleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
