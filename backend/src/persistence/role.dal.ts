import db from '@/loaders/postgresql';
import Logger from '@/loaders/logger';
import RoleRepository from '@/repository/role.rep';
import { UserInput, UserOutput } from '@/models/user.model';
import { Role } from '@/models/role.model';

export default class RoleDalService implements RoleRepository {
    
    
    async deleteRole(role:Role): Promise<Role> {
      try { 
        const query = {
          text: 'DELETE FROM roles WHERE id=$1',
          values:[role.id]
        };
        const res = await db.query(query);
        
        
        if(res.rowCount >=1)
        return role;
        
      } catch (error) {
        throw'mensaje';
      }
    }

   async getRoles(): Promise<Role[]> {
        try { 
            const query = {
              text: 'select * from roles',
            };
            const res = await db.query(query);  
            return res.rows;
          } catch (error) {
            throw'mensaje';
          }
    }
    async findRole(role:Role): Promise<Role> {
        try {  
          const query = {
            text: 'SELECT * FROM roles  WHERE name=$1',
            values:[role.name]
          };
          const res = await db.query(query); 
          return res.rows[0] ;
        } catch (error) {
          throw error;
          ;
        }
      }

      async findRoleById(role:Role): Promise<Role> {
        try {  
          const query = {
            text: 'SELECT * FROM roles  WHERE id=$1',
            values:[role.id]
          };
          const res = await db.query(query);          
          return res.rows[0] ;
        } catch (error) {
          throw error;
          ;
        }
      }

    async registerRole(Role: Role): Promise<Role> {
        const fecha= new Date();  
        
    const query={
        text:`INSERT INTO roles(name,description,register_date,status) VALUES('${Role.name}','${Role.description}','2021-10-01','${Role.status}')`
     // VALUES:[user.name,user.idRole,user.phone,user.email,user.password,user.registerDate,user.status],
     };
    try {
      const res = await db.query(query);
      const id:{id:number} = res.rows[0]
      return  {...id,...Role};
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
      throw error;
    } 
    }

    async updateRole(role: Role): Promise<Role> {
        const query={
            text:'UPDATE ROLES SET name=$1,description=$2,status=$3 WHERE id=$4',
            values:[role.name,role.description,role.status,role.id]
        }
        try{
        const res= await db.query(query);
        if(res.rowCount>0)
        return role;
        }catch (error) {
            Logger.error(`Error SQL => ${error}`);
            throw error;
          } 
      };
   



}