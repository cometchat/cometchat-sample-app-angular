import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatAddGroupMemberListItemComponent } from "./cometchat-add-group-member-list-item.component";

describe("AddMemberViewComponent", () => {
  let component: CometchatAddGroupMemberListItemComponent;
  let fixture: ComponentFixture<CometchatAddGroupMemberListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatAddGroupMemberListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatAddGroupMemberListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
