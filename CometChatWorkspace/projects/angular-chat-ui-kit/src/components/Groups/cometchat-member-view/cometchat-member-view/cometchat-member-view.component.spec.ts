import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatMemberViewComponent } from "./cometchat-member-view.component";

describe("MemberViewComponent", () => {
  let component: CometchatMemberViewComponent;
  let fixture: ComponentFixture<CometchatMemberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatMemberViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
