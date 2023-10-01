export interface CreateUserService {
    email: string,
    displayName: string,
    password: string,
}

export interface CreateUserDBService {
    email: string,
    displayName: string,
    id: string,
    role: string,
    imgURL?: string,
}
