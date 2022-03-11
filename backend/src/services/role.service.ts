import { Role } from '../models/role.model';
import {UserOutput ,UserInput } from '../models/user.model';
import RoleDalService from '../persistence/role.dal';
import RoleRepository from '../repository/role.rep';  
 
import { RoleInterface,  } from '../utils/helpers';
import { Service } from 'typedi';
//l
@Service()
export default class RoleService {
    constructor(@RoleInterface() private roleInterface: RoleRepository) {}

    public async getRoles(): Promise<Role []> {
        try {
          return await this.roleInterface.getRoles();
        } catch (error) {
          throw error;
        }
      }

      public async findRole(role:Role): Promise<Role> {
        try {
          return await this.roleInterface.findRole(role);
        } catch (error) {
          return error;
        }
      }
      public async findRoleById(role:Role): Promise<Role> {
        try {
          return await this.roleInterface.findRoleById(role);
        } catch (error) {
          return error;
        }
      }

      public async registerRole(role: Role): Promise<Role> {
       
        try {
          return await this.roleInterface.registerRole(role);
        } catch (error) {
          throw error;
        }
      }

      public async UpdateRole(role:Role):Promise<Role>{
        try {
          return await this.roleInterface.updateRole(role);
        } catch (error) {
          throw error;
        }
      }

      public async deleteRole(role:Role):Promise<Role>{
        try {
          return await this.roleInterface.deleteRole(role);
        } catch (error) {
          throw error;
        }
      }

}