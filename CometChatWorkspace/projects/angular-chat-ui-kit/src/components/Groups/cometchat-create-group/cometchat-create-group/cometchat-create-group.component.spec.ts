import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatCreateGroupComponent } from "./cometchat-create-group.component";

describe("CometChatCreateGroupComponent", () => {
  let component: CometchatCreateGroupComponent;
  let fixture: ComponentFixture<CometchatCreateGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatCreateGroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
