import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadRecieptComponent } from './read-reciept.component';

describe('ReadRecieptComponent', () => {
  let component: ReadRecieptComponent;
  let fixture: ComponentFixture<ReadRecieptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadRecieptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
