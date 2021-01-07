import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatAvatarComponent } from "./cometchat-avatar.component";

describe("AvatarComponent", () => {
  let component: CometchatAvatarComponent;
  let fixture: ComponentFixture<CometchatAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatAvatarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
