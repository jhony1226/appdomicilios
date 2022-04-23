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
//ll
const helpers_1 = require("../utils/helpers");
const typedi_1 = require("typedi");
let UserService = class UserService {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    async getUsers() {
        try {
            return await this.userInterface.getUsers();
        }
        catch (error) {
            throw error;
        }
    }
    async getDeliverys() {
        try {
            return await this.userInterface.getDeliverys();
        }
        catch (error) {
            throw error;
        }
    }
    async getClients() {
        try {
            return await this.userInterface.getClients();
        }
        catch (error) {
            throw error;
        }
    }
    async registerUser(user) {
        try {
            return await this.userInterface.registerUser(user);
        }
        catch (error) {
            throw error;
        }
    }
    async findUser(email) {
        try {
            return await this.userInterface.findUser(email);
        }
        catch (error) {
            return error;
        }
    }
    async findUserById(user) {
        try {
            return await this.userInterface.findUserById(user);
        }
        catch (error) {
            return error;
        }
    }
    async findEmail(user) {
        try {
            return await this.userInterface.findEmail(user);
        }
        catch (error) {
            return error;
        }
    }
    async findPhone(user) {
        try {
            return await this.userInterface.findPhone(user);
        }
        catch (error) {
            return error;
        }
    }
    async findStatus(user) {
        try {
            return await this.userInterface.findStatus(user);
        }
        catch (error) {
            return error;
        }
    }
    async deleteUser(user) {
        try {
            return await this.userInterface.deleteUser(user);
        }
        catch (error) {
            return error;
        }
    }
    async UpdateUser(user) {
        try {
            return await this.userInterface.updateUser(user);
        }
        catch (error) {
            return error;
        }
    }
    async updateTokenApk(token) {
        try {
            return await this.userInterface.registerTokenApk(token);
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, helpers_1.UserInterface)()),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map