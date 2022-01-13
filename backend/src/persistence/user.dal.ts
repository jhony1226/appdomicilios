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
    const query={
      text:`INSERT INTO USERS(NAME,ID_ROLE,PHONE,EMAIL,PASSWORD,REGISTER_DATE,STATUS) VALUES('${user.name}',${user.idRole},'${user.phone}','${user.email}','${user.password}','${user.registerDate}',${user.status}) RETURNING ID`,
      VALUES:[user.name,user.idRole,user.phone,user.email,user.password,user.registerDate,user.status],

     };
    try {
      const res = await db.query(query);
      const id:{id:number} = res.rows[0]
      return  {...id,...user};
    } catch (err) {
      Logger.error(`Error SQL => ${err}`);
      throw err;
    } 
  }
}
