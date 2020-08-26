import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthenticatedGuard } from './guards/authenticated-guard.guard';
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { FriendsComponent } from './components/friends/friends.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TweetPageComponent } from './components/tweet-page/tweet-page.component';


const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [AuthenticatedGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changeAvatar', component: ChangeAvatarComponent, canActivate: [AuthenticatedGuard] },
  { path: 'editAccount', component: EditAccountComponent, canActivate: [AuthenticatedGuard] },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthenticatedGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthenticatedGuard] },
  { path: 'account/:id', component: AccountPageComponent, canActivate: [AuthenticatedGuard] },
  { path: 'tweet/:id', component: TweetPageComponent, canActivate: [AuthenticatedGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
