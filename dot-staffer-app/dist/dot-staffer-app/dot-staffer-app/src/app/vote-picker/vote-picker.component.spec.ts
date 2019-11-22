import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotePickerComponent } from './vote-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatIconModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('VotePickerComponent', () => {
  let component: VotePickerComponent;
  let fixture: ComponentFixture<VotePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotePickerComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
