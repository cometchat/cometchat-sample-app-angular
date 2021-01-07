import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatStickerViewComponent } from "./cometchat-sticker-view.component";

describe("StickerViewComponent", () => {
  let component: CometchatStickerViewComponent;
  let fixture: ComponentFixture<CometchatStickerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatStickerViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatStickerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
