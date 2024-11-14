
interface LoginDTO {
    token: string,
    authenticated: boolean,
    userId: string,
    internalUserId: string,
    internalUserUUID: string,
    type: 1|0, // 1 is buyer/salesman - 0 is Dealership user
    privileges: string
}

