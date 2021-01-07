import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatToolTipComponent } from "./cometchat-tool-tip.component";

describe("ToolTipComponent", () => {
  let component: CometchatToolTipComponent;
  let fixture: ComponentFixture<CometchatToolTipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatToolTipComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatToolTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
