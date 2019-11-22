import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonVotePickerComponent } from './person-vote-picker.component';
import { MatSelectModule, MatInputModule, MatOptionModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PersonVotePickerComponent', () => {
  let component: PersonVotePickerComponent;
  let fixture: ComponentFixture<PersonVotePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonVotePickerComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatOptionModule,
        MatIconModule,
        MatButtonModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonVotePickerComponent);
    component = fixture.componentInstance;
    component.topics = [];
    component.persons = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
