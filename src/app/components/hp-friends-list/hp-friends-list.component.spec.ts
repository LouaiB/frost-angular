import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HpFriendsListComponent } from './hp-friends-list.component';

describe('HpFriendsListComponent', () => {
  let component: HpFriendsListComponent;
  let fixture: ComponentFixture<HpFriendsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HpFriendsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HpFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
