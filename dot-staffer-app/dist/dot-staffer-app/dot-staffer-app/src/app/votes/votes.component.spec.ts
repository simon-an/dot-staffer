import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesComponent } from './votes.component';
import { VoteComponent } from '../vote/vote.component';
import { MatCardModule } from '@angular/material';

describe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture: ComponentFixture<VotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesComponent, VoteComponent ],
      imports: [MatCardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
