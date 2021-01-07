import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatCreatePollViewComponent } from "./cometchat-create-poll-view.component";

describe("CreatePollViewComponent", () => {
  let component: CometchatCreatePollViewComponent;
  let fixture: ComponentFixture<CometchatCreatePollViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatCreatePollViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatCreatePollViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
