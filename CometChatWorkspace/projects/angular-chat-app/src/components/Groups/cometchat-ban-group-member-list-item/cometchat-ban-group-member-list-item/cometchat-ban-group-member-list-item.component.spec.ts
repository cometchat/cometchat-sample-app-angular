import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatBanGroupMemberListItemComponent } from "./cometchat-ban-group-member-list-item.component";

describe("CometChatBanMembersComponent", () => {
  let component: CometchatBanGroupMemberListItemComponent;
  let fixture: ComponentFixture<CometchatBanGroupMemberListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatBanGroupMemberListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatBanGroupMemberListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
