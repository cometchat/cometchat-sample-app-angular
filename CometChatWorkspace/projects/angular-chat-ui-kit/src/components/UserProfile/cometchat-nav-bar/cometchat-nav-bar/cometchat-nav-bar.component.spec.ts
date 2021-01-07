import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatNavBarComponent } from "./cometchat-nav-bar.component";

describe("NavBarComponent", () => {
  let component: CometchatNavBarComponent;
  let fixture: ComponentFixture<CometchatNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatNavBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
