import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatGroupViewComponent } from "./cometchat-group-view.component";

describe("GroupViewComponent", () => {
  let component: CometchatGroupViewComponent;
  let fixture: ComponentFixture<CometchatGroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatGroupViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
