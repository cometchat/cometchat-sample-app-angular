import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInformationDemoComponent } from './message-information-demo.component';

describe('MessageInformationDemoComponent', () => {
  let component: MessageInformationDemoComponent;
  let fixture: ComponentFixture<MessageInformationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageInformationDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageInformationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
