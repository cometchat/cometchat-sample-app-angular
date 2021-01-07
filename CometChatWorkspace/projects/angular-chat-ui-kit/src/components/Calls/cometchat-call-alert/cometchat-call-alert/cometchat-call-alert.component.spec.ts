import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatIncomingCall } from "./cometchat-call-alert.component";

describe("CallAlertComponent", () => {
  let component: CometchatIncomingCall;
  let fixture: ComponentFixture<CometchatIncomingCall>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatIncomingCall],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatIncomingCall);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
