import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatUnifiedComponent } from "./cometchat-unified.component";

describe("CometChatUnifiedComponent", () => {
  let component: CometchatUnifiedComponent;
  let fixture: ComponentFixture<CometchatUnifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatUnifiedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatUnifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
