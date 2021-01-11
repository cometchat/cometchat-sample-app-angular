import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatBanGroupMemberListComponent } from "./cometchat-ban-group-member-list.component";

describe("BanMemberViewComponent", () => {
  let component: CometchatBanGroupMemberListComponent;
  let fixture: ComponentFixture<CometchatBanGroupMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatBanGroupMemberListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatBanGroupMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
