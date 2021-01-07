import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSharedMediaComponent } from "./cometchat-shared-media.component";

describe("SharedMediaViewComponent", () => {
  let component: CometchatSharedMediaComponent;
  let fixture: ComponentFixture<CometchatSharedMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSharedMediaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSharedMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
