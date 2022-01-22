import { Role } from "@/models/role.model";


export default interface RoleRepository{
    getRoles(): Promise<Role[]>;
    updateRole():Promise<Role>;
    registeRole(user:Role):Promise<Role>;
    findRole(user:Role): Promise<Role>; 
    deleteRole():Promise<Role>
}