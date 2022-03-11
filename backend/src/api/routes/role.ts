import { Router, Request, Response } from 'express';
import Container from 'typedi';
import { UserInput, UserOutput } from '@/models/user.model';
import {Role}  from '../../models/role.model';
import RoleService from '../../services/role.service';
import { celebrate, Joi, Segments,errors} from 'celebrate';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const route = Router();

export default  (app: Router) => {
app.use('/role', route);


route.get('/getRoles', async (req: Request, res: Response) => {
    try {
      //inyectar dependencia a niverl de variable
      const roleService = Container.get(RoleService);
      const roles = await roleService.getRoles();
      return res.json(roles).status(200);
    } catch (error) {
      res.status(500).end();
    }
  });

  route.post(
    '/registerRole',  
    celebrate({
        [Segments.BODY]: Joi.object().keys({       
        name: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response) => {
        const roleService = Container.get(RoleService);
        const findRole = await roleService.findRole(req.body as Role);
        if (findRole) return res.status(400).send({ message: 'The Role is already registered' });
        
        
       const role = await roleService.registerRole(req.body as Role);  
        
        try {
          return res.status(200).send({message:'registered user'});
        } catch (e) {
          return res.status(400).send({ message: 'Register error' });
        }
      },
    );

    route.put(
        '/updateRole',
        celebrate({
          [Segments.BODY]: Joi.object().keys({
            id:Joi.number().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.boolean().required()
          }),
        }),
        async (req: Request, res: Response) => {
          const roleService = Container.get(RoleService);
         
          
          const role = await roleService.findRoleById(req.body as Role);
          if (!role) return res.status(400).send({ message: 'No se encontro el Rol' });
          
          console.log(role)
          
          if(role.name===req.body.name && role.description===req.body.description && role.status===req.body.status)
          return res.status(400).send({ message: 'No existen cambios para aplicar al Rol ' });

          if(role.name!=req.body.name){
              const roleFind = await roleService.findRole(req.body as Role);
              if(roleFind) return res.status(400).send({message:'Ya existe un rol con este nombre'})
          }

          const updateRole = await roleService.UpdateRole(req.body as Role);

          if (!updateRole) return res.status(400).send({message:'Error al actuaizar'});

          return res.status(200).send({message:'El Rol ha sido actualizado'});
         
        }
      );

      route.delete('/deleteRole', 
      celebrate({[Segments.BODY]: Joi.object().keys({
        id:Joi.number().required()
       }),
       
      }),
      async (req: Request, res: Response) => {
        try {
          //inyectar dependencia a niverl de variable
          const roleService = Container.get(RoleService);
          
          const deleteRole = await roleService.deleteRole(req.body as Role);
         
          
          if(!deleteRole)  return res.status(400).send({message:"Error al intentar actaulizar Rol"});

          return res.status(200).send({message:"Rol eliminado"});
          
        } catch (error) {
          res.status(500).end();
        }
      });

}