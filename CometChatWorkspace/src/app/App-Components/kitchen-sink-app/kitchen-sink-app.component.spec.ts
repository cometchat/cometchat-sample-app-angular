import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenSinkAppComponent } from './kitchen-sink-app.component';

describe('KitchenSinkAppComponent', () => {
  let component: KitchenSinkAppComponent;
  let fixture: ComponentFixture<KitchenSinkAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenSinkAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenSinkAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
