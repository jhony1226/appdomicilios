"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
const typedi_1 = require("typedi");
let ServicesService = class ServicesService {
    constructor(servicesInterface) {
        this.servicesInterface = servicesInterface;
    }
    async registerService(service) {
        try {
            return await this.servicesInterface.registerService(service);
        }
        catch (error) {
            throw error;
        }
    }
    async getServices() {
        try {
            return await this.servicesInterface.getServices();
        }
        catch (error) {
            throw error;
        }
    }
    async getServicesByDeliv(service) {
        try {
            return await this.servicesInterface.getServicesByDeliv(service);
        }
        catch (error) {
            throw error;
        }
    }
    async getServiceById(service) {
        try {
            return await this.servicesInterface.getServiceById(service);
        }
        catch (error) {
            throw error;
        }
    }
    async updateService(service) {
        try {
            return await this.servicesInterface.updateService(service);
        }
        catch (error) {
            throw error;
        }
    }
    async updateStatus(service) {
        try {
            return await this.servicesInterface.updateStatus(service);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteService(service) {
        try {
            return await this.servicesInterface.deleteService(service);
        }
        catch (error) {
            throw error;
        }
    }
    async findService(service) {
        try {
            // console.log(service);
            return await this.servicesInterface.findService(service);
        }
        catch (error) {
            throw error;
        }
    }
    async findUser(id) {
        try {
            return await this.servicesInterface.findUserById(id);
        }
        catch (error) {
            return error;
        }
    }
};
ServicesService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, helpers_1.ServiceInterface)()),
    __metadata("design:paramtypes", [Object])
], ServicesService);
exports.default = ServicesService;
//# sourceMappingURL=services.service.js.map