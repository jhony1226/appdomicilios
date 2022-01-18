import { Router, Request, Response } from 'express';
import Container from 'typedi';
import { UserInput, UserOutput } from '@/models/user.model';
import UserService from '@/services/user.service';
import { celebrate, Joi, Segments,errors} from 'celebrate';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const route = Router();

export default (app: Router) => {
  app.use('/user', route);
  //app.use(errors());

  route.get('/getUsers', async (req: Request, res: Response) => {
    try {
      console.log('routs');
      //inyectar dependencia a niverl de variable
      const userService = Container.get(UserService);

      const users = await userService.getUser();
      console.log(users);
      return res.json(users).status(200);
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
        const findUser= await userService.findUser(req.body.email) 
        
        if(findUser)return res.status(400).send({message:"The user is already registered"});

        const passHash = await bcrypt.hash(req.body.password, 10);
        req.body.password=passHash;

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
              process.env.SK_JWT
            ),
            userName: user.name,
          });
        } catch (e) {
          return res.status(400).send({ message: "Register error" });
        }
        
        
     
    },
  );

  route.post(
    '/login',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        idRole: Joi.number().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().required(),
      }),
    }),

    async (req: Request, res: Response) => { 
        const userService = Container.get(UserService);
        const user = await userService.findUser(req.body as UserInput);
        if(!user)return res.status(400).send({message:"Wrong email or password"});

        const hash = await bcrypt.compare(req.body.password, user.password);
        if (!hash)
        return res.status(400).send({ message: "Wrong email or password" });

        try {
          return res.status(200).json({
            token: jwt.sign(
              {
                _id: user.idUser,
                name: user.name,
                roleId: user.idRole,
                iat: moment().unix(),
              },
              process.env.SK_JWT
            ),
            userName: user.name,
          });
        } catch (e) {
          return res.status(400).send({ message: "Login error" });
        }
 
     
    },
  );

  // app.use((error, req, res, next) => {
  //   if (error.joi) {
  //     return res.status(400).json({error: error.joi.message});
  //   }
  
  //   return res.status(500).send(error)
  // });

};
