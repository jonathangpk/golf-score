import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfBallProgressComponent } from './golf-ball-progress.component';

describe('GolfBallProgressComponent', () => {
  let component: GolfBallProgressComponent;
  let fixture: ComponentFixture<GolfBallProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolfBallProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolfBallProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
