import { UserWine } from './userwine.model';
export interface User {
    id?: string
    name?: string
    email?: string
    password?: string
    created_at?: Date
    updated_at?: Date
    user_wine?: UserWine[]
}