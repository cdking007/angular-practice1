export interface UserInterface {
    id: number
    name: string
    email: string
    role?: RoleInterface
}

export interface RoleInterface {
    name: string
    permissions: PermissionInterface[]
}

export interface PermissionInterface {
    id: number
    name: string
    role_permissions: RolePermissionsInterface
}

export interface RolePermissionsInterface {
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
}
