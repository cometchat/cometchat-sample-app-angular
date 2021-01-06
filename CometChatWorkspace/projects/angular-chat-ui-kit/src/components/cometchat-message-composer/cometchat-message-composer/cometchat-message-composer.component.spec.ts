import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatMessageComposerComponent } from "./cometchat-message-composer.component";

describe("CometChatMessageComposerComponent", () => {
  let component: CometchatMessageComposerComponent;
  let fixture: ComponentFixture<CometchatMessageComposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatMessageComposerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatMessageComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
