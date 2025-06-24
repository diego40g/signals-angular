import { User } from "./user";

export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}