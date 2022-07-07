"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationInterface = exports.StatusServiceInterface = exports.RoleInterface = exports.UserInterface = exports.ServiceInterface = void 0;
const service_dal_1 = __importDefault(require("../persistence/service.dal"));
const user_dal_1 = __importDefault(require("../persistence/user.dal"));
const role_dal_1 = __importDefault(require("../persistence/role.dal"));
const statusService_dal_1 = __importDefault(require("../persistence/statusService.dal"));
const typedi_1 = __importDefault(require("typedi"));
const notifications_dal_1 = __importDefault(require("../persistence/notifications.dal"));
function ServiceInterface() {
    return function (object, propertyName, index) {
        const serviceDalService = new service_dal_1.default();
        typedi_1.default.registerHandler({ object, propertyName, index, value: containerInstance => serviceDalService });
    };
}
exports.ServiceInterface = ServiceInterface;
function UserInterface() {
    return function (object, propertyName, index) {
        const userDalService = new user_dal_1.default();
        typedi_1.default.registerHandler({ object, propertyName, index, value: ContainerInstance => userDalService });
    };
}
exports.UserInterface = UserInterface;
function RoleInterface() {
    return function (object, propertyName, index) {
        const roleDalService = new role_dal_1.default();
        typedi_1.default.registerHandler({ object, propertyName, index, value: ContainerInstance => roleDalService });
    };
}
exports.RoleInterface = RoleInterface;
function StatusServiceInterface() {
    return function (object, propertyName, index) {
        const statusServiceDalService = new statusService_dal_1.default();
        typedi_1.default.registerHandler({ object, propertyName, index, value: ContainerInstance => statusServiceDalService });
    };
}
exports.StatusServiceInterface = StatusServiceInterface;
function NotificationInterface() {
    return function (object, propertyName, index) {
        const notificationDalService = new notifications_dal_1.default();
        typedi_1.default.registerHandler({ object, propertyName, index, value: ContainerInstance => notificationDalService });
    };
}
exports.NotificationInterface = NotificationInterface;
//# sourceMappingURL=helpers.js.map