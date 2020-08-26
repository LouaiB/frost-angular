import { Action } from '@ngrx/store';

export const SET_USER = '[User] SetUser';
export const SET_AVATAR = '[User] SetAvatar';
export const SET_NICKNAME = '[User] SetNickname';
export const CLEAR_MENTIONS = '[User] ClearMentions';
export const LOG_OUT = '[User] LogOut';

export class SetUser implements Action{
    readonly type = SET_USER;

    constructor(
        public email: string,
        public token: string,
        public userId: string,
        public nickname: string,
        public avatar: string,
        public slug: string,
        public mentions: []) {}
}

export class SetAvatar implements Action{
    readonly type = SET_AVATAR;

    constructor(public avatar: string) {}
}

export class SetNickname implements Action{
    readonly type = SET_NICKNAME;

    constructor(public nickname: string) {}
}

export class LogOut implements Action {
    readonly type = LOG_OUT;
}

export class ClearMentions implements Action {
    readonly type = CLEAR_MENTIONS;
}

export type All = SetUser | SetAvatar | SetNickname | ClearMentions | LogOut;