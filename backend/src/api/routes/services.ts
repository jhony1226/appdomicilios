import { ServiceInput, ServiceInputDel } from '../../models/service.model';
import ServicesService from '../../services/services.service';
import { UserInput, UserOutput } from '../../models/user.model';
import UserService from '../../services/user.service';
import { Router, Request, Response } from 'express';
import Container from 'typedi';
import { celebrate, Joi, Segments, errors } from 'celebrate';
// import middlewares from '../middlewares';
 
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
      console.log("locas teorias");
      
      console.log(service);
      
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
      console.log('ingreso');
      
      const serviceService = Container.get(ServicesService);
      const serviceFind = await serviceService.findService(req.params['id'] );
      if(!serviceFind) return res.status(400).send({message:'Servicio no existe'});
      console.log( "ddddddd");   
      const service = await serviceService.deleteService(req.params['id'] );
       if(!service) return res.status(400).send({message:'Error, no se elimino el servicio'})
      return res.status(200).send({message:'Servicio eliminado correctamente'});
    } catch (error) {
      res.status(500).end();
    }
  });
};
