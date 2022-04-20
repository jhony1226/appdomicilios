"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const user_service_1 = __importDefault(require("../../services/user.service"));
const celebrate_1 = require("celebrate");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/user', route);
    route.get('/getUsers', async (req, res) => {
        try {
            //inyectar dependencia a niverl de variable
            const userService = typedi_1.default.get(user_service_1.default);
            const users = await userService.getUsers();
            return res.json({ users: users }).status(200);
        }
        catch (error) {
            res.status(500).end();
        }
    });
    route.get('/getDeliverys', async (req, res) => {
        try {
            //inyectar dependencia a niverl de variable
            const userService = typedi_1.default.get(user_service_1.default);
            const users = await userService.getDeliverys();
            return res.json({ users: users }).status(200);
        }
        catch (error) {
            res.status(500).end();
        }
    });
    route.get('/getClients', async (req, res) => {
        try {
            //inyectar dependencia a niverl de variable
            const userService = typedi_1.default.get(user_service_1.default);
            const users = await userService.getClients();
            return res.json({ users: users }).status(200);
        }
        catch (error) {
            res.status(500).end();
        }
    });
    route.post('/registerUser', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            idRole: celebrate_1.Joi.number().required(),
            name: celebrate_1.Joi.string().required(),
            phone: celebrate_1.Joi.string().required(),
            email: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
            status: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res) => {
        const userService = typedi_1.default.get(user_service_1.default);
        const findUser = await userService.findUser(req.body.email);
        if (findUser)
            return res.status(400).send({ message: 'The user is already registered' });
        const passHash = await bcrypt_1.default.hash(req.body.password, 10);
        req.body.password = passHash;
        // const roleId = await role.findOne({ name: "user" });
        // if (!roleId) return res.status(400).send({ message: "No role was assigned" });
        const user = await userService.registerUser(req.body);
        try {
            return res.status(200).json({
                token: jsonwebtoken_1.default.sign({
                    _id: user.idUser,
                    name: user.name,
                    roleId: user.idRole,
                    iat: (0, moment_1.default)().unix(),
                }, process.env.SK_JWT),
                userName: user.name,
            });
        }
        catch (e) {
            return res.status(400).send({ message: 'Register error' });
        }
    });
    route.post('/login', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            email: celebrate_1.Joi.string().trim().email().required(),
            password: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res) => {
        const userService = typedi_1.default.get(user_service_1.default);
        const user = await userService.findUser(req.body.email);
        if (!user)
            return res.status(400).send({ message: 'Wrong email or password' });
        //const hash = await bcrypt.compare(req.body.password, user.password);
        //if (!hash) return res.status(400).send({ message: 'Wrong email or password' });
        try {
            return res.status(200).json({
                token: jsonwebtoken_1.default.sign({
                    _id: user.idUser,
                    name: user.name,
                    roleId: user.idRole,
                    iat: (0, moment_1.default)().unix(),
                }, process.env.SK_JWT),
                userName: user.name,
            });
        }
        catch (e) {
            return res.status(400).send({ message: 'Login error' });
        }
    });
    route.post('/loginDelivery', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            email: celebrate_1.Joi.string().trim().email().required(),
            password: celebrate_1.Joi.string().required(),
            token: celebrate_1.Joi.string().required()
        }),
    }), async (req, res) => {
        const userService = typedi_1.default.get(user_service_1.default);
        const user = await userService.findUser(req.body.email);
        if (!user)
            return res.status(400).send({ message: 'Wrong email or password' });
        //const hash = await bcrypt.compare(req.body.password, user.password);
        //if (!hash) return res.status(400).send({ message: 'Wrong email or password' }); 
        // if (user.idRole!=31) return res.status(400).send({ message: 'No tiene permisos ' });
        try {
            req.body.id = user.id;
            console.log(req.body);
            const updateUser = await userService.updateTokenApk(req.body);
            return res.status(200).json({
                token: jsonwebtoken_1.default.sign({
                    _id: user.idUser,
                    name: user.name,
                    roleId: user.idRole,
                    iat: (0, moment_1.default)().unix(),
                }, process.env.SK_JWT),
                userName: user.name,
                _id: user.idUser,
                email: user.email
            });
        }
        catch (e) {
            return res.status(400).send({ message: 'Login error' });
        }
    });
    route.put('/updateUser/:email', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            idUser: celebrate_1.Joi.number().required(),
            idRole: celebrate_1.Joi.number().required(),
            name: celebrate_1.Joi.string().required(),
            phone: celebrate_1.Joi.string().required(),
            email: celebrate_1.Joi.string().required(),
            status: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res) => {
        const userService = typedi_1.default.get(user_service_1.default);
        const user = await userService.findUser(req.params.email);
        if (!user)
            return res.status(400).send({ message: 'Usuario no encontrado' });
        if (req.body.email != user.email) {
            const userEmail = await userService.findEmail(req.body);
            if (userEmail)
                return res.status(400).send({ message: 'Ya existen usuarios con esta informacion' });
        }
        if (req.body.phone != user.phone) {
            const userPhone = await userService.findPhone(req.body);
            if (userPhone)
                return res.status(400).send({ message: 'Ya existen usuarios con esta informacion' });
        }
        if (!req.body.password) {
            req.body.password = user.password;
        }
        const updateUser = await userService.UpdateUser(req.body);
        if (!updateUser)
            return res.status(400).send({ message: "Error al intentar actualizar usuario" });
        return res.status(200).send({ message: 'Datos actualizados' });
    });
    route.delete('/deleteUser', (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            idUser: celebrate_1.Joi.number().required(),
            idRole: celebrate_1.Joi.number().required(),
            name: celebrate_1.Joi.string().required(),
            phone: celebrate_1.Joi.string().required(),
            email: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
            status: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res) => {
        try {
            const userService = typedi_1.default.get(user_service_1.default);
            const user = await userService.findUser(req.body.email);
            if (!user)
                return res.status(400).send({ message: 'Usuario no encontrado' });
            const deleteUser = await userService.deleteUser(req.body);
            if (!deleteUser)
                return res.status(400).send({ message: 'El usuario no se Elimino' });
            return res.status(200).send({ message: 'El usuario ha sido desactivado' });
        }
        catch (error) {
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
//# sourceMappingURL=user.js.map