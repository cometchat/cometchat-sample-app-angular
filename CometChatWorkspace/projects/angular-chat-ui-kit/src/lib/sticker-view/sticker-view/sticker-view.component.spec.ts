import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerViewComponent } from './sticker-view.component';

describe('StickerViewComponent', () => {
  let component: StickerViewComponent;
  let fixture: ComponentFixture<StickerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
