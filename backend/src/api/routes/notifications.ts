import { NotificationInput, NotificationOutput } from '../../models/notifications.model';
import NotificationService from '../../services/notifications.service';  
import { Router, Request, Response, response } from 'express';
import Container from 'typedi';
import { celebrate, Joi, Segments, errors } from 'celebrate'; 
import { initializeApp } from 'firebase-admin/app'; 
import moment from 'moment';

const route = Router();

export default (app: Router) => {
    app.use('/notification', route);

    route.post('/regNotification',   
  async (req: Request, res: Response) => {
     
    
    try {
      req.body.fecha= moment().format()  
      const  notificationService  = Container.get( NotificationService); 
      const noti = await notificationService.registerNotification (req.body as NotificationInput);  
      if(!noti) return res.status(400).send({message:'No se registronotificacion '})    
      return res.status(200).send({message:'Servicio registrado exitosamente',service:noti}); 
    } catch (error) {
      return res.status(500).end();
    } 
  });
}
