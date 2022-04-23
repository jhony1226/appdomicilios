"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const role_service_1 = __importDefault(require("../../services/role.service"));
const celebrate_1 = require("celebrate");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/role', route);
    route.get('/getRoles', async (req, res) => {
        try {
            //inyectar dependencia a niverl de variable
            const roleService = typedi_1.default.get(role_service_1.default);
            const roles = await roleService.getRoles();
            return res.json(roles).status(200);
        }
        catch (error) {
            res.status(500).end();
        }
    });
    route.post('/registerRole', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            status: celebrate_1.Joi.string().required()
        }),
    }), async (req, res) => {
        const roleService = typedi_1.default.get(role_service_1.default);
        const findRole = await roleService.findRole(req.body);
        if (findRole)
            return res.status(400).send({ message: 'The Role is already registered' });
        const role = await roleService.registerRole(req.body);
        try {
            return res.status(200).send({ message: 'registered user' });
        }
        catch (e) {
            return res.status(400).send({ message: 'Register error' });
        }
    });
    route.put('/updateRole', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            id: celebrate_1.Joi.number().required(),
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            status: celebrate_1.Joi.boolean().required()
        }),
    }), async (req, res) => {
        const roleService = typedi_1.default.get(role_service_1.default);
        const role = await roleService.findRoleById(req.body);
        if (!role)
            return res.status(400).send({ message: 'No se encontro el Rol' });
        console.log(role);
        if (role.name === req.body.name && role.description === req.body.description && role.status === req.body.status)
            return res.status(400).send({ message: 'No existen cambios para aplicar al Rol ' });
        if (role.name != req.body.name) {
            const roleFind = await roleService.findRole(req.body);
            if (roleFind)
                return res.status(400).send({ message: 'Ya existe un rol con este nombre' });
        }
        const updateRole = await roleService.UpdateRole(req.body);
        if (!updateRole)
            return res.status(400).send({ message: 'Error al actuaizar' });
        return res.status(200).send({ message: 'El Rol ha sido actualizado' });
    });
    route.delete('/deleteRole', (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            id: celebrate_1.Joi.number().required()
        }),
    }), async (req, res) => {
        try {
            //inyectar dependencia a niverl de variable
            const roleService = typedi_1.default.get(role_service_1.default);
            const deleteRole = await roleService.deleteRole(req.body);
            if (!deleteRole)
                return res.status(400).send({ message: "Error al intentar actaulizar Rol" });
            return res.status(200).send({ message: "Rol eliminado" });
        }
        catch (error) {
            res.status(500).end();
        }
    });
};
//# sourceMappingURL=role.js.map