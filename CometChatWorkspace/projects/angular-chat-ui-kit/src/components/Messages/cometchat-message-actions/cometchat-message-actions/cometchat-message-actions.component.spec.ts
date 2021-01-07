import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatMessageActionsComponent } from "./cometchat-message-actions.component";

describe("ToolTipComponent", () => {
  let component: CometchatMessageActionsComponent;
  let fixture: ComponentFixture<CometchatMessageActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatMessageActionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatMessageActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
