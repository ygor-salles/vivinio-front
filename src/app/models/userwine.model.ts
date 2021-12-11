import { Wine } from 'src/app/models/wine.model';

export interface UserWine {
    id?: number
    user_id?: number
    wine_id?: number
    created_at?: Date
    wine?: Wine
}