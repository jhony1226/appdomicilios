import { Router, Request, Response } from 'express';
import Container from 'typedi';
import { UserInput, UserOutput } from '@/models/user.model';
import UserService from '@/services/user.service';
import { celebrate, Joi, Segments } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get('/getUsers/:name', async (req: Request, res: Response) => {
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
    // celebrate({
    //   [Segments.BODY]: Joi.object().keys({  
    //     idRole: Joi.number().required(),
    //     name: Joi.string().required(),
    //     phone: Joi.string().required(),
    //     email: Joi.string().required(),
    //     password: Joi.string().required(),
    //     registerDate: Joi.date().required(),
    //     status: Joi.string().required(),
    //   }),
    // }),
    async (req: Request, res: Response) => {
      try {
          console.log('register');
          
        const userService = Container.get(UserService);
        const user = await userService.registerUser(req.body as UserInput);
        return res.json(user).status(201);
      } catch (error) {
        return res.status(500).end();
      }
    },
  );
};
