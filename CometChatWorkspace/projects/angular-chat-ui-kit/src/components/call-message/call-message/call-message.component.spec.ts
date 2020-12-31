import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallMessageComponent } from './call-message.component';

describe('CallMessageComponent', () => {
  let component: CallMessageComponent;
  let fixture: ComponentFixture<CallMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
