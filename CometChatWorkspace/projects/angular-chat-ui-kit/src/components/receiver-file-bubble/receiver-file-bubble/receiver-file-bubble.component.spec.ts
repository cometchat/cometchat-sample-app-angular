import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverFileBubbleComponent } from './receiver-file-bubble.component';

describe('ReceiverFileBubbleComponent', () => {
  let component: ReceiverFileBubbleComponent;
  let fixture: ComponentFixture<ReceiverFileBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverFileBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverFileBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
