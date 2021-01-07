import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatGroupListComponent } from "./cometchat-group-list.component";

describe("CometChatGroupListComponent", () => {
  let component: CometchatGroupListComponent;
  let fixture: ComponentFixture<CometchatGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatGroupListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
