import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VotePickerComponent } from './vote-picker/vote-picker.component';
import { ResultComponent } from './result/result.component';
// tslint:disable-next-line: max-line-length
import {
  MatTreeModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatTabsModule,
  MatExpansionModule,
  MatListModule,
  MatToolbarModule,
  MatChipsModule,
  MatBadgeModule,
  MatSelectModule,
} from '@angular/material';
import { VotesComponent } from './votes/votes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonVotePickerComponent } from './person-vote-picker/person-vote-picker.component';
import { DndPickerComponent } from './dnd-picker/dnd-picker.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VoteComponent } from './vote/vote.component';
import { SessionResultComponent } from './session-result/session-result.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { PersonListComponent } from './person-list/person-list.component';
import { WorkshopSettingsComponent } from './workshop-settings/workshop-settings.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { ValidationComponent } from './validation/validation.component';

@NgModule({
  declarations: [
    AppComponent,
    VotePickerComponent,
    PersonVotePickerComponent,
    ResultComponent,
    VotesComponent,
    DndPickerComponent,
    VoteComponent,
    SessionResultComponent,
    AddPersonComponent,
    PersonListComponent,
    WorkshopSettingsComponent,
    AddTopicComponent,
    TopicListComponent,
    ValidationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
