import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NgError } from '../models/error.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as PopsActions from '../actions/pops.actions';

export class ErrorIntercept implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: any) => {
                    console.log("IN ERROR INTERCEPTOR");
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = error.error.message;
                    } else {
                        // server-side error
                        if(error.error.errors)
                            errorMessage = `\n${error.error.errors.join(" ")}`;
                        else
                            errorMessage = error.error.message;

                        // !! REMOVE IN PRODUCTION !!
                        console.log(error);
                    }

                    // Should log in DB, but for this example, console.log
                    //console.log(errorMessage);

                    return throwError(new NgError(errorMessage, !(error.error instanceof ErrorEvent), error));
                })
            )
    }
}