import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundResultComponent } from './round-result.component';

describe('RoundResultComponent', () => {
  let component: RoundResultComponent;
  let fixture: ComponentFixture<RoundResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
