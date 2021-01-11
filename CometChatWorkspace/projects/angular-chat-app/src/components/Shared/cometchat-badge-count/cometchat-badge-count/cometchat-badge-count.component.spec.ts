import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatBadgeCountComponent } from "./cometchat-badge-count.component";

describe("BadgeCountComponent", () => {
  let component: CometchatBadgeCountComponent;
  let fixture: ComponentFixture<CometchatBadgeCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatBadgeCountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatBadgeCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
