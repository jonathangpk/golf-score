import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundScorecardComponent } from './round-scorecard.component';

describe('RoundScorecardComponent', () => {
  let component: RoundScorecardComponent;
  let fixture: ComponentFixture<RoundScorecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundScorecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
