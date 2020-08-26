import * as PopsActions from '../actions/pops.actions';
import { Alert } from '../models/alert.model';

export type Action = PopsActions.All;

const defaultState: Alert[] = [];
    
export function popsReducer(state: Alert[] = defaultState, action: Action){
    switch(action.type){
        case PopsActions.ADD_POP:
            return [ action.payload, ...state ];

        case PopsActions.REMOVE_POP:
            return state.filter(al => 
                !(al.title == action.payload.title
                && al.message == action.payload.message
                && al.type == action.payload.type));

        case PopsActions.CLEAR_POPS:
            return [];

        default:
            return state;
    }
}