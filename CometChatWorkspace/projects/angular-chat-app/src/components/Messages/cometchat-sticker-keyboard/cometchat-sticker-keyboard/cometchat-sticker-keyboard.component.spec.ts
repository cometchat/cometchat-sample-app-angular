import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatStickerKeyboardComponent } from "./cometchat-sticker-keyboard.component";

describe("StickerViewComponent", () => {
  let component: CometchatStickerKeyboardComponent;
  let fixture: ComponentFixture<CometchatStickerKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatStickerKeyboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatStickerKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
