"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notifications_service_1 = __importDefault(require("../../services/notifications.service"));
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const moment_1 = __importDefault(require("moment"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/notification', route);
    route.post('/regNotification', async (req, res) => {
        try {
            req.body.fecha = (0, moment_1.default)().format();
            const notificationService = typedi_1.default.get(notifications_service_1.default);
            const noti = await notificationService.registerNotification(req.body);
            if (!noti)
                return res.status(400).send({ message: 'No se registronotificacion ' });
            return res.status(200).send({ message: 'Servicio registrado exitosamente', service: noti });
        }
        catch (error) {
            return res.status(500).end();
        }
    });
};
//# sourceMappingURL=notifications.js.map