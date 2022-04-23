"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_service_1 = __importDefault(require("../../services/services.service"));
const user_service_1 = __importDefault(require("../../services/user.service"));
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const celebrate_1 = require("celebrate");
// import middlewares from '../middlewares';
var FCM = require('fcm-node');
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/services', route);
    route.post('/registerService', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            idCliente: celebrate_1.Joi.number().required(),
            idDeliv: celebrate_1.Joi.number().required(),
            price: celebrate_1.Joi.number().required(),
            destination: celebrate_1.Joi.string().required(),
            source: celebrate_1.Joi.string().required(),
            observation: celebrate_1.Joi.string().required(),
            idStatus: celebrate_1.Joi.number().required(),
        }),
    }), async (req, res) => {
        try {
            const serviceService = typedi_1.default.get(services_service_1.default);
            const service = await serviceService.registerService(req.body);
            if (!service)
                return res.status(400).send({ message: 'No se registro el servicio' });
            console.log(service.idService);
            const user = await serviceService.findUser(req.body.idDeliv);
            return res.status(200).send({ message: 'Servicio registrado exitosamente', service: service });
        }
        catch (error) {
            return res.status(500).end();
        }
    });
    route.put('/updateService', async (req, res) => {
        try {
            // console.log("back updateService"); console.log(req.body);      
            const serviceService = typedi_1.default.get(services_service_1.default);
            const serviceFind = await serviceService.findService(req.body);
            if (!serviceFind)
                return res.status(400).send({ message: 'El servicio no existe' });
            const service = await serviceService.updateService(req.body);
            if (!service)
                return res.status(400).send({ message: 'Error no se actualizo el servicio' });
            return res.status(200).send({ message: 'El servicio se actualizo correctamente' });
        }
        catch (error) {
            return res.status(500).end();
        }
    });
    route.put('/updateStatus', async (req, res) => {
        try {
            // console.log(req.body);
            const serviceService = typedi_1.default.get(services_service_1.default);
            const serviceFind = await serviceService.findService(req.body);
            if (!serviceFind)
                return res.status(400).send({ message: 'El servicio no existe' });
            const service = await serviceService.updateStatus(req.body);
            if (!service)
                return res.status(400).send({ message: 'Error no se actualizo el servicio' });
            return res.status(200).send({ message: 'El servicio se actualizo correctamente' });
        }
        catch (error) {
            return res.status(500).end();
        }
    });
    route.get('/getServices', async (req, res) => {
        try {
            const serviceService = typedi_1.default.get(services_service_1.default);
            const service = await serviceService.getServices();
            if (!service)
                return res.status(400).send({ message: 'Error al listar servicios' });
            return res.status(200).send({ servicios: service });
        }
        catch (error) {
            res.status(500).end();
        }
    });
    route.get('/getServicesByDeliv', async (req, res) => {
        try {
            const userService = typedi_1.default.get(user_service_1.default);
            const existingUser = await userService.findUserById(req.body);
            if (!existingUser)
                return res.status(400).send({ message: 'El usuario no existe' });
            //castear el dato de iduser a idDeliv y poder usar la consulta getServiceByDeliv
            const serviceReq = { idDeliv: undefined };
            serviceReq.idDeliv = req.body.idUser;
            const serviceService = typedi_1.default.get(services_service_1.default);
            const service = await serviceService.getServicesByDeliv(serviceReq);
            if (!service)
                return res.status(400).send({ message: 'El usuario no tiene servicios asignados' });
            return res.status(200).send({ servicios: service });
        }
        catch (error) {
            res.status(500).end();
        }
    });
    route.get('/getServiceById/:id', async (req, res) => {
        try {
            // console.log(req.params.id);
            const serviceService = typedi_1.default.get(services_service_1.default);
            const service = await serviceService.getServiceById(req.params);
            if (service.length === 0)
                return res.status(400).send({ message: 'No existe el servicio' });
            if (!service)
                return res.status(400).send({ message: 'Error al listar servicios' });
            return res.status(200).send({ servicios: service });
        }
        catch (error) {
            res.status(500).end();
        }
    });
    route.delete('/deleteService', 
    /**celebrate({
      [Segments.BODY]: Joi.object().keys({
        id:Joi.number().required()
      }),
    }),*/
    async (req, res) => {
        try {
            const serviceService = typedi_1.default.get(services_service_1.default);
            const serviceFind = await serviceService.findService(req.params['id']);
            if (!serviceFind)
                return res.status(400).send({ message: 'Servicio no existe' });
            const service = await serviceService.deleteService(req.params['id']);
            if (!service)
                return res.status(400).send({ message: 'Error, no se elimino el servicio' });
            return res.status(200).send({ message: 'Servicio eliminado correctamente' });
        }
        catch (error) {
            res.status(500).end();
        }
    });
    route.post('/fcm', async (req, res) => {
        const SERVER_KEY = 'AAAAnLFhPb0:APA91bF2xVOwIBdp4Ts0TG5l2b2r2bIPygq_1PVzihHf8pbHDLDvAQbJs2eg6FGw7-bwGF8NgXsMGplbOETXuAhmP48vE4Y-IqZOqic-MC-Mv4_gQ8ja7QOfB0Ggn5ptQYecvr6AxlKM';
        try {
            let fcm = new FCM(SERVER_KEY);
            let message = {
                to: req.body.id_token,
                notification: {
                    title: req.body.title,
                    body: req.body.body_text
                },
                data: {
                    idService: req.body.idService
                },
                "sound": "default"
            };
            fcm.send(message, (err, response) => {
                if (err) {
                    // console.log(err);
                }
                else {
                    res.json(response);
                }
            });
        }
        catch (error) {
            // console.log(error);
        }
    });
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
//# sourceMappingURL=services.js.map