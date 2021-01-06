import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatBanMemberViewComponent } from "./cometchat-ban-member-view.component";

describe("BanMemberViewComponent", () => {
  let component: CometchatBanMemberViewComponent;
  let fixture: ComponentFixture<CometchatBanMemberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatBanMemberViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatBanMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
