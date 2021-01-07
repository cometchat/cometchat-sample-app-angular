import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatImageViewComponent } from "./cometchat-image-view.component";

describe("ImageViewComponent", () => {
  let component: CometchatImageViewComponent;
  let fixture: ComponentFixture<CometchatImageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatImageViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
