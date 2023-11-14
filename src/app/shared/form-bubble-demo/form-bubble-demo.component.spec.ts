import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBubbleDemoComponent } from './form-bubble-demo.component';

describe('FormBubbleDemoComponent', () => {
  let component: FormBubbleDemoComponent;
  let fixture: ComponentFixture<FormBubbleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBubbleDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBubbleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
