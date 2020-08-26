import * as UserActions from '../actions/user.actions';
import { User } from '../models/user.model';

export type Action = UserActions.All;

const defaultState: User = {
    email: '',
    token: '',
    userId: '',
    isLoggedIn: false,
    nickname: null,
    avatar: null,
    slug: '',
    mentions: []
}
    
export function userReducer(state: User = defaultState, action: Action){
    switch(action.type){
        case UserActions.SET_USER:
            return { 
                ...state,
                email: action.email,
                token: action.token,
                userId: action.userId,
                isLoggedIn: true,
                nickname: action.nickname,
                avatar: action.avatar,
                slug: action.slug,
                mentions: action.mentions
            };

        case UserActions.SET_AVATAR:
            return { ...state, avatar: action.avatar };

        case UserActions.SET_NICKNAME:
            return { ...state, nickname: action.nickname };

        case UserActions.CLEAR_MENTIONS:
            return { ...state, mentions: [] };

        case UserActions.LOG_OUT:
            return defaultState;

        default:
            return state;
    }
}