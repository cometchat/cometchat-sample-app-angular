import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatBanMembersComponent } from "./cometchat-ban-members.component";

describe("CometChatBanMembersComponent", () => {
  let component: CometchatBanMembersComponent;
  let fixture: ComponentFixture<CometchatBanMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatBanMembersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatBanMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
