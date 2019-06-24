import { Role } from "../enums/Role";

export interface User {
    id?: number,
    login: string,
    password?: string,
    role?: Role
}

