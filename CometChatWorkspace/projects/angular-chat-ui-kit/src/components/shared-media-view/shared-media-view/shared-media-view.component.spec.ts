import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedMediaViewComponent } from './shared-media-view.component';

describe('SharedMediaViewComponent', () => {
  let component: SharedMediaViewComponent;
  let fixture: ComponentFixture<SharedMediaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedMediaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedMediaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
