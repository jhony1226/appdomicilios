import { Router, Request, Response } from 'express';
import Container from 'typedi';
import { TokenApp, UserInput, UserOutput } from '../../models/user.model';
import UserService from '../../services/user.service';
import { celebrate, Joi, Segments, errors } from 'celebrate';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get('/getUsers', async (req: Request, res: Response) => {
    try {
      //inyectar dependencia a niverl de variable
      const userService = Container.get(UserService);
      const users = await userService.getUsers();
      return res.json({users:users}).status(200);
    } catch (error) {
      res.status(500).end();
    }
  });

  route.get('/getDeliverys', async (req: Request, res: Response) => {
    try {
      //inyectar dependencia a niverl de variable
      const userService = Container.get(UserService);
      const users = await userService.getDeliverys();
      return res.json({users:users}).status(200);
    } catch (error) {
      res.status(500).end();
    }
  });

  route.get('/getClients', async (req: Request, res: Response) => {
    try {
      //inyectar dependencia a niverl de variable
      const userService = Container.get(UserService);
      const users = await userService.getClients();
      return res.json({users:users}).status(200);
    } catch (error) {
      res.status(500).end();
    }
  });

  route.post(
    '/registerUser',  
    celebrate({
        [Segments.BODY]: Joi.object().keys({
        idRole: Joi.number().required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        status: Joi.string().required(),
      }),
    }),

    async (req: Request, res: Response) => {
      const userService = Container.get(UserService);
      const findUser = await userService.findUser(req.body.email);
      if (findUser) return res.status(400).send({ message: 'The user is already registered' });

      const passHash = await bcrypt.hash(req.body.password, 10);
      req.body.password = passHash;

      // const roleId = await role.findOne({ name: "user" });
      // if (!roleId) return res.status(400).send({ message: "No role was assigned" });

      const user = await userService.registerUser(req.body as UserInput);
      try {
        return res.status(200).json({
          token: jwt.sign(
            {
              _id: user.idUser,
              name: user.name,
              roleId: user.idRole,
              iat: moment().unix(),
            },
            process.env.SK_JWT,
          ),
          userName: user.name,
        });
      } catch (e) {
        return res.status(400).send({ message: 'Register error' });
      }
    },
  );

  route.post('/login',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().required(),
      }),
    }),

    async (req: Request, res: Response) => {
      const userService = Container.get(UserService);
      const user = await userService.findUser(req.body.email); 
      
      if (!user) return res.status(400).send({ message: 'Wrong email or password' });

      //const hash = await bcrypt.compare(req.body.password, user.password);
     // if (!hash) return res.status(400).send({ message: 'Wrong email or password' });

      try {
        return res.status(200).json({
          token: jwt.sign(
            {
              _id: user.idUser,
              name: user.name,
              //roleId: user.idRole,
              iat: moment().unix(),
            },
            process.env.SK_JWT,
          ),
          userName: user.name,
        });
      } catch (e) {
        return res.status(400).send({ message: 'Login error' });
      }
    },
  );

  
  route.post('/loginDelivery',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().required(), 
        token:Joi.string().required()
      }),
    }),

    async (req: Request, res: Response) => {
      const userService = Container.get(UserService);
      const user = await userService.findUser(req.body.email);  
      if (!user) return res.status(400).send({ message: 'Wrong email or password' });

      //const hash = await bcrypt.compare(req.body.password, user.password);
      //if (!hash) return res.status(400).send({ message: 'Wrong email or password' }); 
     // if (user.idRole!=31) return res.status(400).send({ message: 'No tiene permisos ' });
      try {
        req.body.id=user.id;
        console.log(req.body);
        
        const updateUser = await userService.updateTokenApk(req.body );

        return res.status(200).json({
          token: jwt.sign(
            {
              _id: user.idUser,
              name: user.name,
              roleId: user.idRole,
              iat: moment().unix(),
            },
            process.env.SK_JWT,
          ),
          userName: user.name,
          _id: user.idUser,
          email: user.email

        });
      } catch (e) {
        return res.status(400).send({ message: 'Login error' });
      }
    },
  );

  route.put(   '/updateUser/:email',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        idUser:Joi.number().required(),
        idRole: Joi.number().required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().required(),
        status: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      const userService = Container.get(UserService);
      const user = await userService.findUser(req.params.email);
      if (!user) return res.status(400).send({ message: 'Usuario no encontrado' });

      if(req.body.email!=user.email){
        const userEmail = await userService.findEmail(req.body as UserInput);
       
        if(userEmail)
          return res.status(400).send({message:'Ya existen usuarios con esta informacion'})
      }

      if(req.body.phone!=user.phone){
        const userPhone = await userService.findPhone(req.body as UserInput);
      if(userPhone)
        return res.status(400).send({message:'Ya existen usuarios con esta informacion'});

      }   
      
      if(!req.body.password){
        req.body.password=user.password;
      }
           
      const updateUser = await userService.UpdateUser(req.body as UserInput);
      
      if(!updateUser) return res.status(400).send({message:"Error al intentar actualizar usuario"});

      return res.status(200).send({message:'Datos actualizados'});

    }
  );

  route.delete('/deleteUser/:idUser', /*
      celebrate({[Segments.BODY]: Joi.object().keys({
        idUser:Joi.number().required(),
        idRole: Joi.number().required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        status: Joi.string().required(),
       }),
       
      }),*/
      async (req: Request, res: Response) => {
        try {
          
          const userService = Container.get(UserService);
          const user = await userService.findUserById(req.params.idUser);
          if (!user) return res.status(200).send({ message: 'Usuario no encontrado' });

          const statusUser = await userService.findStatus(req.params.idUser);
          if(statusUser == 'I') return res.status(200).send({message:'El usuario ya esta Inactivo'});          

          const deleteUser = await userService.deleteUser(req.params.idUser);
          if(!deleteUser) return res.status(200).send({message:'El usuario no se desactivo'});

          return  res.status(200).send({message:'El usuario ha sido desactivado'});         
        } catch (error) {
          res.status(500).end();
        }
      });
/*
      route.post(
        '/registerTokenApk',  
        celebrate({
            [Segments.BODY]: Joi.object().keys({   
            idToken: Joi.string().required(),
            email: Joi.string().required(),
          }),
        }),
    
        async (req: Request, res: Response) => {
          const userService = Container.get(UserService);
          const findUser = await userService.findUser(req.body.email);
          if (!findUser) return res.status(400).send({ message: 'El usuario no existe' }); 
          try {
             req.body.idUser=7; 
             console.log(req.body); 
             const token = await userService.registerTokenApk(req.body as TokenApp ); 
             return res.status(200).send({message:token});
          } catch (e) {
            return res.status(400).send({ message: 'Register error' });
          }
        },
      );
      */
};
