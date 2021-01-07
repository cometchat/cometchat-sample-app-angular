import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatUserInfoScreenComponent } from "./cometchat-user-info-screen.component";

describe("CometChatUserInfoScreenComponent", () => {
  let component: CometchatUserInfoScreenComponent;
  let fixture: ComponentFixture<CometchatUserInfoScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatUserInfoScreenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatUserInfoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
