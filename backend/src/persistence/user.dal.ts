import db from '@/loaders/postgresql';
import Logger from '@/loaders/logger';
import UserRepository from '@/repository/user.rep';
import { UserInput, UserOutput } from '@/models/user.model';

export default class UserDalService implements UserRepository {
  
  async getUser(): Promise<UserOutput[]> {
    try {
      console.log('dal'); 
      const query = {
        text: 'select * from users',
      };
      const res = await db.query(query);
      console.log(res.rows); 
      const userList: UserOutput[]=[]; 
      return res.rows;
    } catch (error) {
      throw'mensaje';
    }
  }

  async registerUser(user:UserInput):Promise<UserOutput>{
    const fecha= new Date();
    console.log(fecha);
    
    const query={
      text:`INSERT INTO USERS(NAME,ID_ROLE,PHONE,EMAIL,PASSWORD,REGISTER_DATE,STATUS) VALUES('${user.name}',${user.idRole},'${user.phone}','${user.email}','${user.password}','2020-01-10', '${user.status}') RETURNING ID`,
     // VALUES:[user.name,user.idRole,user.phone,user.email,user.password,user.registerDate,user.status],
     };
    try {
      const res = await db.query(query);
      const id:{id:number} = res.rows[0]
      return  {...id,...user};
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
      throw error;
    } 
  }

  async findUser(user:UserInput): Promise<UserOutput> {
    try { 
      
      const query = {
        text: 'select * from users  where email=$1',
        values:[user]
      };
      const res = await db.query(query); 
      return res.rows[0] ;
    } catch (error) {
      throw error;
      ;
    }
  }
}
