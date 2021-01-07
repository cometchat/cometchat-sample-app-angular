import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatViewGroupMemberListComponent } from "./cometchat-view-group-member-list.component";

describe("CometchatViewMembersComponent", () => {
  let component: CometchatViewGroupMemberListComponent;
  let fixture: ComponentFixture<CometchatViewGroupMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatViewGroupMemberListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatViewGroupMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
