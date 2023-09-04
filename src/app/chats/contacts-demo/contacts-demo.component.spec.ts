import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsDemoComponent } from './contacts-demo.component';

describe('ContactsDemoComponent', () => {
  let component: ContactsDemoComponent;
  let fixture: ComponentFixture<ContactsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
