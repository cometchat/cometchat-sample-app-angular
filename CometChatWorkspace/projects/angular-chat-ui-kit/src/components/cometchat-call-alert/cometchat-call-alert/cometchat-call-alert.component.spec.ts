import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatCallAlertComponent } from "./cometchat-call-alert.component";

describe("CallAlertComponent", () => {
  let component: CometchatCallAlertComponent;
  let fixture: ComponentFixture<CometchatCallAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatCallAlertComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatCallAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
