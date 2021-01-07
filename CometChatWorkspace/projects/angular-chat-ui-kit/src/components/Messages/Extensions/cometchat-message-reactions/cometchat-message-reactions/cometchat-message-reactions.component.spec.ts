import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatMessageReactionsComponent } from "./cometchat-message-reactions.component";

describe("CometchatRegularReactionViewComponent", () => {
  let component: CometchatMessageReactionsComponent;
  let fixture: ComponentFixture<CometchatMessageReactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatMessageReactionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatMessageReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
