import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatIncomingCallComponent } from "./cometchat-incoming-call.component";

describe("CallAlertComponent", () => {
  let component: CometchatIncomingCallComponent;
  let fixture: ComponentFixture<CometchatIncomingCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatIncomingCallComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatIncomingCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
