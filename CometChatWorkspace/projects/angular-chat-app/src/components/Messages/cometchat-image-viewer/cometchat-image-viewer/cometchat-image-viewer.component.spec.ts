import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatImageViewerComponent } from "./cometchat-image-viewer.component";

describe("ImageViewComponent", () => {
  let component: CometchatImageViewerComponent;
  let fixture: ComponentFixture<CometchatImageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatImageViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
