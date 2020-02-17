import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavigationComponentComponent } from './app-navigation-component.component';

describe('AppNavigationComponentComponent', () => {
  let component: AppNavigationComponentComponent;
  let fixture: ComponentFixture<AppNavigationComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNavigationComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavigationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
