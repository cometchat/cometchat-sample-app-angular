import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatUnifiedChatComponent } from "./cometchat-unified-chat.component";

describe("CometChatUnifiedComponent", () => {
  let component: CometchatUnifiedChatComponent;
  let fixture: ComponentFixture<CometchatUnifiedChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatUnifiedChatComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatUnifiedChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
