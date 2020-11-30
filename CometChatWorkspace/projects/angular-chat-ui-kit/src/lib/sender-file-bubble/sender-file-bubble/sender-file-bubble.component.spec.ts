import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderFileBubbleComponent } from './sender-file-bubble.component';

describe('SenderFileBubbleComponent', () => {
  let component: SenderFileBubbleComponent;
  let fixture: ComponentFixture<SenderFileBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenderFileBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderFileBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
