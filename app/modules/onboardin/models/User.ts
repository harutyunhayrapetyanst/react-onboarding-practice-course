import { Role } from "../enums/Role";

// login request requires User object for simplicity
export interface User {
    id?: number,
    username: string,
    password?: string,
    name?: string,
    role?: Role
}

