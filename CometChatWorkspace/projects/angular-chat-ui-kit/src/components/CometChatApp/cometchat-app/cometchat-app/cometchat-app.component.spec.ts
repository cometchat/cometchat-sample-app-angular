import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatAppComponent } from "./cometchat-app.component";

describe("CometChatUnifiedComponent", () => {
  let component: CometchatAppComponent;
  let fixture: ComponentFixture<CometchatAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatAppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
