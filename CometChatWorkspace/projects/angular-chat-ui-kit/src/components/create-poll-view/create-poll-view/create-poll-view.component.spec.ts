import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePollViewComponent } from './create-poll-view.component';

describe('CreatePollViewComponent', () => {
  let component: CreatePollViewComponent;
  let fixture: ComponentFixture<CreatePollViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePollViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePollViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
