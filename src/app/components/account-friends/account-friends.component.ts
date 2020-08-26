import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-friends',
  templateUrl: './account-friends.component.html',
  styleUrls: ['./account-friends.component.sass']
})
export class AccountFriendsComponent implements OnInit {

  @Input() account: any;
  apiUrl: string = environment.apiUrl;
  user: Observable<any>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user = this.store.select('user');
  }

  viewAccount(accountId){
    this.router.navigate(['/account', accountId]);
  }

}
