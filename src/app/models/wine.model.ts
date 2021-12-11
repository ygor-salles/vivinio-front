import { Review } from 'src/app/models/review.model';
export interface Wine {
    id?: number
    name?: string
    producer?: string
    country?: string
    type?: string
    type_grape?: string
    harmonizing?: string
    image: File
    image_url?: string
    user_id?: any
    created_at?: Date
    updated_at?: Date
    reviews?: Review[]
}