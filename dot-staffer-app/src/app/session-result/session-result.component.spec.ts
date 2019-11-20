import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionResultComponent } from './session-result.component';
import { MatChipsModule, MatBadgeModule } from '@angular/material';

describe('SessionResultComponent', () => {
  let component: SessionResultComponent;
  let fixture: ComponentFixture<SessionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionResultComponent ],
      imports: [ MatChipsModule, MatBadgeModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
