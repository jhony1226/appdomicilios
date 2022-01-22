import db from '@/loaders/postgresql';
import Logger from '@/loaders/logger';
import RoleRepository from '@/repository/role.rep';
import { UserInput, UserOutput } from '@/models/user.model';
import { Role } from '@/models/role.model';

export default class RoleDalService implements RoleRepository {
    updateRole(): Promise<Role> {
        throw new Error('Method not implemented.');
    } 
    
    deleteRole(): Promise<Role> {
        throw new Error('Method not implemented.');
    }

    getRoles(): Promise<Role[]> {
        throw new Error('Method not implemented.');
    }
    registeRole(user: Role): Promise<Role> {
        throw new Error('Method not implemented.');
    }
    findRole(user: Role): Promise<Role> {
        throw new Error('Method not implemented.');
    }



}