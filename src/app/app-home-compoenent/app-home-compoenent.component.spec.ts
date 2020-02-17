import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomeCompoenentComponent } from './app-home-compoenent.component';

describe('AppHomeCompoenentComponent', () => {
  let component: AppHomeCompoenentComponent;
  let fixture: ComponentFixture<AppHomeCompoenentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomeCompoenentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomeCompoenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
