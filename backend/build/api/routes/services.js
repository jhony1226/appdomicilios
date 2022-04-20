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
            return res.status(200).send({ message: 'Servicio registrado exitosamente' });
        }
        catch (error) {
            return res.status(500).end();
        }
    });
    route.put('/updateService', async (req, res) => {
        try {
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
            console.log(req.body);
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
            console.log("entro a roles");
            const serviceService = typedi_1.default.get(services_service_1.default);
            const service = await serviceService.getServices();
            console.log("locas teorias");
            console.log(service);
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
    route.delete('/deleteService/:id', async (req, res) => {
        try {
            const serviceService = typedi_1.default.get(services_service_1.default);
            const serviceFind = await serviceService.findService(req.params['id']);
            if (!serviceFind)
                return res.status(400).send({ message: 'Servicio no existe' });
            console.log("ddddddd");
            const service = await serviceService.deleteService(req.params['id']);
            if (!service)
                return res.status(400).send({ message: 'Error, no se elimino el servicio' });
            return res.status(200).send({ message: 'Servicio eliminado correctamente' });
        }
        catch (error) {
            res.status(500).end();
        }
    });
};
//# sourceMappingURL=services.js.map