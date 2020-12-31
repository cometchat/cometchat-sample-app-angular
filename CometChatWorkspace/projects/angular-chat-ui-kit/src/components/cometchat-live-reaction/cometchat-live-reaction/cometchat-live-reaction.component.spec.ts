import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatLiveReactionComponent } from "./cometchat-live-reaction.component";

describe("LiveReactionComponent", () => {
  let component: CometchatLiveReactionComponent;
  let fixture: ComponentFixture<CometchatLiveReactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatLiveReactionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatLiveReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
