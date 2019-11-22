import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SessionResultComponent } from './session-result/session-result.component';
import {
  MatExpansionModule,
  MatListModule,
  MatDividerModule,
  MatChipsModule,
  MatBadgeModule,
  MatSelectModule,
  MatToolbarModule,
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatTreeModule,
  MatIconModule,
  MatCardModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VotePickerComponent } from './vote-picker/vote-picker.component';
import { PersonVotePickerComponent } from './person-vote-picker/person-vote-picker.component';
import { ResultComponent } from './result/result.component';
import { VotesComponent } from './votes/votes.component';
import { DndPickerComponent } from './dnd-picker/dnd-picker.component';
import { VoteComponent } from './vote/vote.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        MatChipsModule,
        MatBadgeModule,
        MatSelectModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule,
      ],
      declarations: [
        AppComponent,
        VotePickerComponent,
        PersonVotePickerComponent,
        ResultComponent,
        VotesComponent,
        DndPickerComponent,
        VoteComponent,
        SessionResultComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dot-staffer-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('dot-staffer-app');
  });
});
