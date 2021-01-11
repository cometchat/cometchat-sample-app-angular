import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatAddGroupMemberListComponent } from "./cometchat-add-group-member-list.component";

describe("CometchatAddMembersComponent", () => {
  let component: CometchatAddGroupMemberListComponent;
  let fixture: ComponentFixture<CometchatAddGroupMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatAddGroupMemberListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatAddGroupMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
