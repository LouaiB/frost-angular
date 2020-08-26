import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './reducers/user.reducer';
import { popsReducer } from './reducers/pops.reducer';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ErrorIntercept } from './interceptors/error.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { EscapeHtmlPipe } from './helpers/keep-html.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsComponent } from './components/comments/comments.component';
import { FeedComponent } from './components/feed/feed.component';
import { PopListComponent } from './components/pop-list/pop-list.component';
import { PopComponent } from './components/pop/pop.component';
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component';
import { ProfileStripComponent } from './components/profile-strip/profile-strip.component';
import { HpFriendsListComponent } from './components/hp-friends-list/hp-friends-list.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { AccountFriendsComponent } from './components/account-friends/account-friends.component';
import { AccountTweetsComponent } from './components/account-tweets/account-tweets.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { SendTweetComponent } from './components/send-tweet/send-tweet.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { FriendsComponent } from './components/friends/friends.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './components/logout/logout.component';
import { TweetPageComponent } from './components/tweet-page/tweet-page.component';
import { SearchTweetsComponent } from './components/search-tweets/search-tweets.component';
import { GridGalleryComponent } from './components/grid-gallery/grid-gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    PageNotFoundComponent,
    TweetComponent,
    CommentComponent,
    CommentsComponent,
    FeedComponent,
    PopListComponent,
    PopComponent,
    ChangeAvatarComponent,
    ProfileStripComponent,
    HpFriendsListComponent,
    AccountPageComponent,
    AccountSummaryComponent,
    AccountFriendsComponent,
    AccountTweetsComponent,
    SearchUsersComponent,
    SendTweetComponent,
    EditAccountComponent,
    FriendsComponent,
    LogoutComponent,
    TweetPageComponent,
    SearchTweetsComponent,
    GridGalleryComponent,
    EscapeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ 
      user: userReducer,
      pops: popsReducer,
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
