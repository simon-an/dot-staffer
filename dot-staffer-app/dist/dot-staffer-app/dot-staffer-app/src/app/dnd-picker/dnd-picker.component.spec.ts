import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DndPickerComponent } from './dnd-picker.component';
import { MatToolbarModule, MatCardModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VoteComponent } from '../vote/vote.component';
import { BehaviorSubject } from 'rxjs';

describe('DndPickerComponent', () => {
  let component: DndPickerComponent;
  let fixture: ComponentFixture<DndPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DndPickerComponent, VoteComponent],
      imports: [MatToolbarModule, DragDropModule, MatCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DndPickerComponent);
    component = fixture.componentInstance;
    component.sessions$ = new BehaviorSubject([]);
    component.votes = [];
    component.topics = [];
    component.sessionHolders = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
