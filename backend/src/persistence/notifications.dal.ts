import db from '../loaders/postgresql';
import Logger from '../loaders/logger';
import NotificationRepository from '../repository/notifications.rep';
import { NotificationInput, NotificationOutput } from '../models/notifications.model';


export default class NotificationDalService implements NotificationRepository {
    async registerNotification(noti: NotificationInput): Promise<NotificationOutput> { 
       
      console.log(noti);
      
         const query = {
            text: `INSERT INTO notificacion(status,id_servicio,title,subtitle,descripcion,fecha) VALUES(${noti.status},${noti.idService},'${noti.title}','${noti.subtitle}','${noti.descripcion}','${noti.fecha}')RETURNING ID`
          };
            try {
              
              const res = await db.query(query);   
             // console.log(res.rows);
              if(res.rowCount>=1){
                 const id:{id:number} = res.rows[0]  
                 return  {...id,...noti};
              }
            } catch (error) {
              Logger.error(`Error SQL notification => ${error}`);
          throw error;
            }
    }
    getNotification(): Promise<NotificationInput> {
        throw new Error('Method not implemented.');
    }
}