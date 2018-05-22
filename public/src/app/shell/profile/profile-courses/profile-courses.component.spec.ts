import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCoursesComponent } from './profile-courses.component';

describe('ProfileCoursesComponent', () => {
  let component: ProfileCoursesComponent;
  let fixture: ComponentFixture<ProfileCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
