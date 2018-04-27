import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSettingsComponent } from './round-settings.component';

describe('RoundSettingsComponent', () => {
  let component: RoundSettingsComponent;
  let fixture: ComponentFixture<RoundSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
