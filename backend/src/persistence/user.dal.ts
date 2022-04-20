import db from '../loaders/postgresql';
import Logger from '../loaders/logger';
import UserRepository from '../repository/user.rep';
import { UserInput, UserOutput } from '../models/user.model';
import { query } from 'winston';

export default class UserDalService implements UserRepository { 

  async updateUser(user: UserInput): Promise<UserOutput> {
    const query = {
      text:'UPDATE users SET id_role=$1, name=$2, phone=$3, email=$4, password=$5, status=$6 WHERE id=$7',
      values:[user.idRole,user.name,user.phone,user.email,user.password,user.status,user.idUser]
    };
    try {
      const res= await db.query(query);
      if(res.rowCount==1) return user;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  };

  async deleteUser(user: any): Promise<any> {
      
    const query = {
        text: `update users set status='I' where id=$1`,
        values:[user]
      };
    
    try {
     const res= await db.query(query);
         
     if(res.rowCount>=1)
     return user;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  }
  
  async getUsers(): Promise<UserOutput[]> {
    try { 
      const query = {
        text: 'select * from users',
      };
      const res = await db.query(query);  
      return res.rows;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  }

  async getDeliverys(): Promise<UserOutput[]> {
    try { 
      const query = {
        text: 'select * from users where id_role=$1',
        values:[31]
      };
      const res = await db.query(query);  
      return res.rows;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  }

  async getClients(): Promise<UserOutput[]> {
    try { 
      const query = {
        text: 'select * from users where id_role=$1 and status=$2',
        values:[30,'A']
      };
           
      
      const res = await db.query(query);  
      return res.rows;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  };

  async registerUser(user:UserInput):Promise<UserOutput>{
    const fecha= new Date();  
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

  async findUser(email): Promise<UserOutput> {
    try {  
      const query = {
        text: 'select * from users  where email=$1',
        values:[email]
      };
      const res = await db.query(query); 
      
      
      return res.rows[0] ;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  };

  async findUserById(user:any): Promise<UserOutput> {
    try {  
      const query = {
        text: 'select * from users  where id=$1',
        values:[user]
      };
      const res = await db.query(query);       
      if(res.rowCount>=1) return res.rows[0] ;

      return undefined;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  };

  async findEmail(user:UserInput): Promise<UserOutput> {
    try {  
      const query = {
        text: 'select * from users  where email=$1 AND id!=$2',
        values:[user.email,user.idUser]
      };
      const res = await db.query(query); 
      return res.rows[0] ;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  }

  async findPhone(user:UserInput): Promise<UserOutput> {
    try {  
      const query = {
        text: 'select * from users  where email=$1 AND id!=$2',
        values:[user.phone,user.idUser]
      };
      const res = await db.query(query); 
      return res.rows[0] ;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  }

  async findStatus(user:any): Promise<any> {
    try {  
      const query = {
        text: 'select * from users  where id=$1',
        values:[user]
      };
      const res = await db.query(query); 
      return res.rows[0].status ;
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
          throw error;
    }
  }
  
  async registerTokenApk(token:any):Promise<any>{
    const fecha= new Date();  
    const query = {
      text: 'update users set id_token=$1 where id=$2',
      values:[token.token,token.id]
    };
    try {
      const res = await db.query(query);
      const id:{id:number} = res.rows[0]
      return  {...id,...token};
    } catch (error) {
      Logger.error(`Error SQL => ${error}`);
      throw error;
    } 
  }

}
