import { Role } from "@/models/role.model";


export default interface RoleRepository{
    getRoles(): Promise<Role[]>;
    updateRole(role:Role):Promise<Role>;//cambie linea
    registerRole(role:Role):Promise<Role>;
    findRole(role:Role): Promise<Role>; 
    findRoleById (role:Role): Promise<Role>; 
    deleteRole(role:Role):Promise<Role>;
}