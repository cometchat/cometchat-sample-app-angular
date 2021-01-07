import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatViewGroupMemberListItemComponent } from "./cometchat-view-group-member-list-item.component";

describe("MemberViewComponent", () => {
  let component: CometchatViewGroupMemberListItemComponent;
  let fixture: ComponentFixture<CometchatViewGroupMemberListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatViewGroupMemberListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CometchatViewGroupMemberListItemComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
