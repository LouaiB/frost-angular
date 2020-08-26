import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFriendsComponent } from './account-friends.component';

describe('AccountFriendsComponent', () => {
  let component: AccountFriendsComponent;
  let fixture: ComponentFixture<AccountFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
