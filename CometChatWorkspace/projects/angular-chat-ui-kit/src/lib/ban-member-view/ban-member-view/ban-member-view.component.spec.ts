import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanMemberViewComponent } from './ban-member-view.component';

describe('BanMemberViewComponent', () => {
  let component: BanMemberViewComponent;
  let fixture: ComponentFixture<BanMemberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanMemberViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
