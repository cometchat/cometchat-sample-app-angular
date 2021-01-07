import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatCallAlert } from "./cometchat-call-alert.component";

describe("CallAlertComponent", () => {
  let component: CometchatCallAlert;
  let fixture: ComponentFixture<CometchatCallAlert>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatCallAlert],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatCallAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
