import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatOutgoingCallComponent } from "./cometchat-outgoing-call.component";

describe("CallScreenComponent", () => {
  let component: CometchatOutgoingCallComponent;
  let fixture: ComponentFixture<CometchatOutgoingCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatOutgoingCallComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatOutgoingCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
