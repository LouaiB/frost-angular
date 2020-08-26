import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTweetsComponent } from './account-tweets.component';

describe('AccountTweetsComponent', () => {
  let component: AccountTweetsComponent;
  let fixture: ComponentFixture<AccountTweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
