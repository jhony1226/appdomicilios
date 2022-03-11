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
let statusServicesService = class statusServicesService {
    constructor(statusServicesInterface) {
        this.statusServicesInterface = statusServicesInterface;
    }
    async registerStatusService(statusService) {
        try {
            return await this.statusServicesInterface.registerStatusService(statusService);
        }
        catch (error) {
            throw error;
        }
    }
    async getStatusServices() {
        try {
            return await this.statusServicesInterface.getStatusServices();
        }
        catch (error) {
            throw error;
        }
    }
    async updateStatusService(statusService) {
        try {
            return await this.statusServicesInterface.updateStatusService(statusService);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteStatusService(statusService) {
        try {
            return await this.statusServicesInterface.deleteStatusService(statusService);
        }
        catch (error) {
            throw error;
        }
    }
    async findStatusService(statusService) {
        try {
            return await this.statusServicesInterface.findStatusService(statusService);
        }
        catch (error) {
            throw error;
        }
    }
};
statusServicesService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, helpers_1.StatusServiceInterface)()),
    __metadata("design:paramtypes", [Object])
], statusServicesService);
exports.default = statusServicesService;
//# sourceMappingURL=statusService.service.js.map