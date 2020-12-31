import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveReactionComponent } from './live-reaction.component';

describe('LiveReactionComponent', () => {
  let component: LiveReactionComponent;
  let fixture: ComponentFixture<LiveReactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveReactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
