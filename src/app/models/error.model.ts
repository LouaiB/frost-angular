import { HttpErrorResponse } from '@angular/common/http';

export class NgError{
    constructor(
        public message: string,
        public isServerError: boolean,
        public error: any
    ) { }
}