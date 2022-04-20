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
//l
let RoleService = class RoleService {
    constructor(roleInterface) {
        this.roleInterface = roleInterface;
    }
    async getRoles() {
        try {
            return await this.roleInterface.getRoles();
        }
        catch (error) {
            throw error;
        }
    }
    async findRole(role) {
        try {
            return await this.roleInterface.findRole(role);
        }
        catch (error) {
            return error;
        }
    }
    async findRoleById(role) {
        try {
            return await this.roleInterface.findRoleById(role);
        }
        catch (error) {
            return error;
        }
    }
    async registerRole(role) {
        try {
            return await this.roleInterface.registerRole(role);
        }
        catch (error) {
            throw error;
        }
    }
    async UpdateRole(role) {
        try {
            return await this.roleInterface.updateRole(role);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteRole(role) {
        try {
            return await this.roleInterface.deleteRole(role);
        }
        catch (error) {
            throw error;
        }
    }
};
RoleService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, helpers_1.RoleInterface)()),
    __metadata("design:paramtypes", [Object])
], RoleService);
exports.default = RoleService;
//# sourceMappingURL=role.service.js.map