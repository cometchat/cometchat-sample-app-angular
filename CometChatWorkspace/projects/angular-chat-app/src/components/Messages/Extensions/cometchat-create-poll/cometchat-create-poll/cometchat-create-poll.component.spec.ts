import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatCreatePollComponent } from "./cometchat-create-poll.component";

describe("CreatePollViewComponent", () => {
  let component: CometchatCreatePollComponent;
  let fixture: ComponentFixture<CometchatCreatePollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatCreatePollComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatCreatePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
