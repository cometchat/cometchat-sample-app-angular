import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatSharedMediaViewComponent } from "./cometchat-shared-media-view.component";

describe("SharedMediaViewComponent", () => {
  let component: CometchatSharedMediaViewComponent;
  let fixture: ComponentFixture<CometchatSharedMediaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatSharedMediaViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatSharedMediaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
