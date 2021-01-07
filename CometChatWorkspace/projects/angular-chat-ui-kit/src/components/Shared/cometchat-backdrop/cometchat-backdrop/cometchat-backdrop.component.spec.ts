import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CometchatBackdropComponent } from "./cometchat-backdrop.component";

describe("BackdropComponent", () => {
  let component: CometchatBackdropComponent;
  let fixture: ComponentFixture<CometchatBackdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CometchatBackdropComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CometchatBackdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
