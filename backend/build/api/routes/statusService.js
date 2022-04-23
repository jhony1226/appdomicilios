"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusService_service_1 = __importDefault(require("../../services/statusService.service"));
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
// import middlewares from '../middlewares'; ff
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/statusService', route);
    route.post('/registerStatusService', async (req, res) => {
        try {
            const serviceService = typedi_1.default.get(statusService_service_1.default);
            const statusService = await serviceService.registerStatusService(req.body);
            if (!statusService)
                return res.status(400).send({ message: 'El estado del servicio no fue creado' });
            return res.status(200).send({ message: 'Estado del servicio ha sido creado' });
        }
        catch (error) {
            return res.status(500).end();
        }
    });
};
//# sourceMappingURL=statusService.js.map