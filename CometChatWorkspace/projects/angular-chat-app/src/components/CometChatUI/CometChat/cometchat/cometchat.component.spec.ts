import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometChatComponent } from "./cometchat.component";

describe("CometChatUnifiedComponent", () => {
  let component: CometChatComponent;
  let fixture: ComponentFixture<CometChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometChatComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
