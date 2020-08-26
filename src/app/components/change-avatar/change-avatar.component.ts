import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChangeAvatarModel } from 'src/app/models/changeAvatar.viewmodel';
import { UserService } from 'src/app/services/user.service';
import { NgError } from 'src/app/models/error.model';
import * as PopsActions from '../../actions/pops.actions';
import * as UserActions from '../../actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.sass']
})
export class ChangeAvatarComponent implements OnInit {

  fileToUpload: File = null;
  user: Observable<any>;
  apiUrl: string = environment.apiUrl;
  newAvatarPreview: string = null;
  uploading: boolean = false;
  serverUnreachable: boolean = false;

  constructor(
    private userService: UserService, 
    private store: Store<AppState>,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.user = this.store.select('user');
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = () => {
      this.newAvatarPreview = reader.result.toString();
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit(){
    const file = this.fileToUpload;
    if(!file){
      alert('please select file');
    } else {
      this.uploading = true;
      this.userService.changeAvatar(file).pipe(first()).subscribe(response => {
        const newAvatar = response.avatar;

        // Set new avatar in store
        this.store.dispatch(new UserActions.SetAvatar(newAvatar));

        // Display success popup
        this.store.dispatch(new PopsActions.AddPop({
          title: 'Avatar Changed',
          message: 'Changed avatar successfully',
          type: 'success'
        }));

        this.uploading = false;

        // Navigate to homepage
        this.router.navigate(['/']);
      }, (err: NgError) => {
        this.uploading = false;
        if (err.error.status == 0){
          // Server Unreachable
          this.serverUnreachable = true;
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Error',
            message: 'Server is unreachable at this moment',
            type: 'eternal-error'
          }));
        } else {
          this.store.dispatch(new PopsActions.AddPop({
            title: 'Error',
            message: err.message,
            type: 'error'
          }));
        }
      });
    }
  }
}
