import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatCallScreenComponent } from "./cometchat-call-screen.component";

describe("CallScreenComponent", () => {
  let component: CometchatCallScreenComponent;
  let fixture: ComponentFixture<CometchatCallScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatCallScreenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatCallScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
