import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatCallMessageComponent } from "./cometchat-call-message.component";

describe("CallMessageComponent", () => {
  let component: CometchatCallMessageComponent;
  let fixture: ComponentFixture<CometchatCallMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatCallMessageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatCallMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
