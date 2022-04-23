import { ServiceInput, ServiceInputDel } from '../../models/service.model';
import ServicesService from '../../services/services.service';
import { UserInput, UserOutput } from '../../models/user.model';
import UserService from '../../services/user.service';
import { Router, Request, Response, response } from 'express';
import Container from 'typedi';
import { celebrate, Joi, Segments, errors } from 'celebrate'; 
import { initializeApp } from 'firebase-admin/app';
// import middlewares from '../middlewares';

var FCM = require('fcm-node');
 
 
const route = Router();


export default (app: Router) => {
  app.use('/services', route);

  route.post('/registerService', 
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      idCliente:Joi.number().required(),
      idDeliv: Joi.number().required(),
      price: Joi.number().required(),
      destination: Joi.string().required(),
      source: Joi.string().required(),
      observation: Joi.string().required(),
      idStatus: Joi.number().required(),
    }),
  }),
  
  async (req: Request, res: Response) => {
    try {
      
      const serviceService = Container.get(ServicesService); 
      const service = await serviceService.registerService(req.body as ServiceInput); 
      if(!service) return res.status(400).send({message:'No se registro el servicio'}) 
      const user = await serviceService.findUser(req.body.idDeliv);
      
      console.log(user['id_token']);
       
      
      return res.status(200).send({message:'Servicio registrado exitosamente'});
    
    } catch (error) {
      return res.status(500).end();
    }

   

  });

  route.put('/updateService', async (req: Request, res: Response) => {
    try {
      console.log("back updateService"); console.log(req.body);      
      
      const serviceService = Container.get(ServicesService);
      const serviceFind = await serviceService.findService(req.body as  ServiceInput);
      if(!serviceFind) return res.status(400).send({message:'El servicio no existe'})

      const service = await serviceService.updateService(req.body as ServiceInput);
      if(!service) return res.status(400).send({message:'Error no se actualizo el servicio'});

      return res.status(200).send({message:'El servicio se actualizo correctamente'});
    } catch (error) {
      return res.status(500).end();
    }
  });

  route.put('/updateStatus', async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      
      const serviceService = Container.get(ServicesService);
      const serviceFind = await serviceService.findService(req.body as  ServiceInput);
      if(!serviceFind) return res.status(400).send({message:'El servicio no existe'})

      const service = await serviceService.updateStatus(req.body as ServiceInput);
      if(!service) return res.status(400).send({message:'Error no se actualizo el servicio'});

      return res.status(200).send({message:'El servicio se actualizo correctamente'});
    } catch (error) {
      return res.status(500).end();
    }
  });

  route.get('/getServices', async (req: Request, res: Response) => {
    try {
      
      const serviceService = Container.get(ServicesService);
      const service = await serviceService.getServices(); 
      if(!service) return res.status(400).send({message:'Error al listar servicios'});

      return res.status(200).send({servicios:service});
    } catch (error) {
      res.status(500).end();
    }
  });

  route.get('/getServicesByDeliv', async (req: Request, res: Response) => {
    try {
      const userService=Container.get(UserService);
      const existingUser= await userService.findUserById(req.body as UserInput);
      if(!existingUser) return res.status(400).send({message:'El usuario no existe'});
      //castear el dato de iduser a idDeliv y poder usar la consulta getServiceByDeliv
      const serviceReq={idDeliv:undefined};
      serviceReq.idDeliv=req.body.idUser;

      const serviceService = Container.get(ServicesService);
      const service = await serviceService.getServicesByDeliv(serviceReq as ServiceInput);
      
      if(!service) return res.status(400).send({message:'El usuario no tiene servicios asignados'});

      return res.status(200).send({servicios:service});
    } catch (error) {
      res.status(500).end();
    }
  });

  route.get('/getServiceById/:id', async (req: Request, res: Response) => {
    try {
      console.log(req.params.id);
      
      const serviceService = Container.get(ServicesService);
      const service = await serviceService.getServiceById(req.params);
      
      if(service.length===0) return res.status(400).send({message:'No existe el servicio'})
      
      if(!service) return res.status(400).send({message:'Error al listar servicios'});

      return res.status(200).send({servicios:service});
     
    } catch (error) {
      res.status(500).end();
    }
  });

  route.delete('/deleteService', 
  /**celebrate({
    [Segments.BODY]: Joi.object().keys({
      id:Joi.number().required()      
    }),
  }),*/
  async (req: Request, res: Response) => {
    try { 
      const serviceService = Container.get(ServicesService);
      const serviceFind = await serviceService.findService(req.params['id'] );
      if(!serviceFind) return res.status(400).send({message:'Servicio no existe'}); 
      const service = await serviceService.deleteService(req.params['id'] );
       if(!service) return res.status(400).send({message:'Error, no se elimino el servicio'})
      return res.status(200).send({message:'Servicio eliminado correctamente'});
    } catch (error) {
      res.status(500).end();
    }
  });

  route.post('/fcm',  
  async (req: Request, res: Response) => {
    const SERVER_KEY='AAAAnLFhPb0:APA91bF2xVOwIBdp4Ts0TG5l2b2r2bIPygq_1PVzihHf8pbHDLDvAQbJs2eg6FGw7-bwGF8NgXsMGplbOETXuAhmP48vE4Y-IqZOqic-MC-Mv4_gQ8ja7QOfB0Ggn5ptQYecvr6AxlKM'
    try {
    let fcm= new FCM(SERVER_KEY)
    let message={
      to: req.body.id_token,
      notification: {
        title: req.body.title,
        body: req.body. body_text
      },
      data: {
        idService: req.body.idService
      },
      "sound":"default"
    }
  
    fcm.send(message,(err,response)=>{
      if(err){
       console.log(err);
       
      }else{
        console.log("send notifications");
        
        
      }
    })
   
      
    } catch (error) {
      console.log(error);
      
    }
  
    
  },
  );







/*
  const firebaseConfig = {
    apiKey: "AIzaSyBOaBGBji-q0c-34VFzLvpqrFfZFXYM590",
    authDomain: "app-domicilo.firebaseapp.com",
    projectId: "app-domicilo",
    storageBucket: "app-domicilo.appspot.com",
    messagingSenderId: "672990838205",
    appId: "1:672990838205:web:3addbe715765d8cc1726d4",
    measurementId: "G-7LP7XHXVGM"
  };
  
  // Initialize Firebase
  const apps = initializeApp(firebaseConfig); 
  const messaging = getMessaging(apps);
 
  getToken(messaging, { vapidKey: 'BK_k_sRGpPbGG-dNoIkD2yGtzbEIOAwt19tHTkPRDwItHPn-A1le2erZEpsJfh9wtXu8znBZrlZdwMK9_rIBTQc' }).then((currentToken) => {
    if (currentToken) { 

    } else { 
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });*/
};
