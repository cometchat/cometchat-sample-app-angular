import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometChatUserContactListComponent } from "./comet-chat-user-contact-list.component";

describe("CometChatUserContactListComponent", () => {
  let component: CometChatUserContactListComponent;
  let fixture: ComponentFixture<CometChatUserContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometChatUserContactListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometChatUserContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
