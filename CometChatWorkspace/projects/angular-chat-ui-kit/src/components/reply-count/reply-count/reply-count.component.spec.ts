import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyCountComponent } from './reply-count.component';

describe('ReplyCountComponent', () => {
  let component: ReplyCountComponent;
  let fixture: ComponentFixture<ReplyCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
