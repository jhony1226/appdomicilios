import { Role } from '@/models/role.model';
import {UserOutput ,UserInput } from '@/models/user.model';
import RoleRepository from '@/repository/role.rep';  
 
import { RoleInterface,  } from '@/utils/helpers';
import { Service } from 'typedi';

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

}