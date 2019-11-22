import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopSettingsComponent } from './workshop-settings.component';

describe('WorkshopSettingsComponent', () => {
  let component: WorkshopSettingsComponent;
  let fixture: ComponentFixture<WorkshopSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
