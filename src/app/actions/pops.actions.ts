import { Action } from '@ngrx/store';
import { Alert } from '../models/alert.model';

export const ADD_POP = '[Pops] AddPop';
export const REMOVE_POP = '[Pops] RemovePop';
export const CLEAR_POPS = '[Pops] ClearPops';

export class AddPop implements Action{
    readonly type = ADD_POP;

    constructor(public payload: Alert) {}
}

export class RemovePop implements Action {
    readonly type = REMOVE_POP;

    constructor(public payload: Alert) {}
}

export class ClearPops implements Action {
    readonly type = CLEAR_POPS;
}

export type All = AddPop | RemovePop | ClearPops;