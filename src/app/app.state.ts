import { User } from './models/user.model';
import { Alert } from './models/alert.model';

export interface AppState {
    user: User,
    pops: Alert[]
}