import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatUserProfileComponent } from "./cometchat-user-profile.component";

describe("CometChatUserInfoScreenComponent", () => {
  let component: CometchatUserProfileComponent;
  let fixture: ComponentFixture<CometchatUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatUserProfileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
