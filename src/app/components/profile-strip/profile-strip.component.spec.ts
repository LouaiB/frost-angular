import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStripComponent } from './profile-strip.component';

describe('ProfileStripComponent', () => {
  let component: ProfileStripComponent;
  let fixture: ComponentFixture<ProfileStripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
