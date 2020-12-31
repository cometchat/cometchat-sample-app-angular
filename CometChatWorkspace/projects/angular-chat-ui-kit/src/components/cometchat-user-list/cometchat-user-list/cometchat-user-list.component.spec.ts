import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatUserListComponent } from "./cometchat-user-list.component";

describe("CometChatUserContactListComponent", () => {
  let component: CometchatUserListComponent;
  let fixture: ComponentFixture<CometchatUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatUserListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
