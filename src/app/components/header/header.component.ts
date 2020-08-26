import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import * as UserActions from 'src/app/actions/user.actions';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import { NgError } from 'src/app/models/error.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy  {

  @ViewChild('right') right: ElementRef;
  user: User = null;
  user$: Subscription
  isDropdownOpen: boolean = false;
  newMentions: any[] = [];
  apiUrl: string = environment.apiUrl;

  constructor(
    private store: Store<AppState>,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.store.select('user').subscribe(user => {
      if(user.isLoggedIn){
        this.user = user;
        this.newMentions = user.mentions.filter(m => !m.seen);
      } else {
        this.user = null;
        this.newMentions = [];
      }
    });
  }

  ngAfterViewInit(){
    this.right.nativeElement.addEventListener('mouseover', () => this.isDropdownOpen = true);
    this.right.nativeElement.addEventListener('mouseout', () => this.isDropdownOpen = false);
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  goToAccount(){
    this.router.navigate(['/account', this.user.userId]);
  }

  setSeen(){
    this.userService.setSeen().pipe(first()).subscribe(response => {
      this.store.dispatch(new UserActions.ClearMentions());
    });
  }

}
