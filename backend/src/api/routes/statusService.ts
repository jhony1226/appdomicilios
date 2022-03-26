import { StatusServiceInput } from '../../models/statusService.model';
import StatusServicesService from '../../services/statusService.service';
import { Router, Request, Response } from 'express';
import Container from 'typedi';
// import middlewares from '../middlewares'; ff

const route = Router();

export default (app: Router) => {
  app.use('/statusService', route);

  route.post('/registerStatusService', async (req: Request, res: Response) => {
    try {
      const serviceService = Container.get(StatusServicesService);
      const statusService = await serviceService.registerStatusService(req.body as StatusServiceInput);
      if(!statusService)return res.status(400).send({message:'El estado del servicio no fue creado'})

      return res.status(200).send({message:'Estado del servicio ha sido creado'});
    } catch (error) {
      return res.status(500).end();
    }
  }); 
};
