import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatAddMemberViewComponent } from "./cometchat-add-member-view.component";

describe("AddMemberViewComponent", () => {
  let component: CometchatAddMemberViewComponent;
  let fixture: ComponentFixture<CometchatAddMemberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatAddMemberViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatAddMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
