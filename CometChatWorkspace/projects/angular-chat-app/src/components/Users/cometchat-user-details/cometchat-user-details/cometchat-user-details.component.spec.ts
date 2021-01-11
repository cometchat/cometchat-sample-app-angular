import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatUserDetailsComponent } from "./cometchat-user-details.component";

describe("CometChatUserDetailComponent", () => {
  let component: CometchatUserDetailsComponent;
  let fixture: ComponentFixture<CometchatUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatUserDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
