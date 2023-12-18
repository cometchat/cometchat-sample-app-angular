import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogDetailsDemoComponent } from './call-log-details-demo.component';

describe('CallLogDetailsDemoComponent', () => {
  let component: CallLogDetailsDemoComponent;
  let fixture: ComponentFixture<CallLogDetailsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogDetailsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogDetailsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
