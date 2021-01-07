import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatLiveReactionsComponent } from "./cometchat-live-reactions.component";

describe("LiveReactionComponent", () => {
  let component: CometchatLiveReactionsComponent;
  let fixture: ComponentFixture<CometchatLiveReactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatLiveReactionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatLiveReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
