import { User } from "./User";

export interface Post {
    title: string,
    body: string,
    user: User,
    createdAt: Date,
    modifiedAt: Date,
}