import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotStafferComponentsComponent } from './dot-staffer-components.component';

describe('DotStafferComponentsComponent', () => {
  let component: DotStafferComponentsComponent;
  let fixture: ComponentFixture<DotStafferComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotStafferComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotStafferComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
