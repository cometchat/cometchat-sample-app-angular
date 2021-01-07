import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatUserDetailComponent } from "./cometchat-user-detail.component";

describe("CometChatUserDetailComponent", () => {
  let component: CometchatUserDetailComponent;
  let fixture: ComponentFixture<CometchatUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatUserDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
