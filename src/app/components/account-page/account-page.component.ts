import { Component, OnInit, Input, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, ParamMap } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgError } from 'src/app/models/error.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as PopsActions from '../../actions/pops.actions';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.sass']
})
export class AccountPageComponent implements OnInit {

  accountId: string;
  account: any = null;
  isLoading: boolean = true;
  notFound: boolean = false;
  serverUnreachable: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.accountId = params.get('id');
      this.loadAccount();
    });
  }

  loadAccount(){
    this.isLoading = true;
    this.account = null;

    setTimeout(() => {
      this.userService.getAccount(this.accountId).pipe(first()).subscribe(account => {
        this.account = account;
        this.isLoading = false;
      }, (err: NgError) => {
        if (err.error.status == 0){
          // Server Unreachable
          this.serverUnreachable = true;
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Error',
            message: 'Server is unreachable at this moment',
            type: 'eternal-error'
          }));
        } else if(err.error.status == 404){
          this.notFound = true;
          this.isLoading = false;
        } else {
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Error',
            message: err.message,
            type: 'error'
          }));
        }
        
      });

    }, environment.fakeNetworkDelayShort);
  }
}
