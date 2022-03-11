"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = __importDefault(require("./routes/services"));
const user_1 = __importDefault(require("./routes/user"));
const role_1 = __importDefault(require("./routes/role"));
const statusService_1 = __importDefault(require("./routes/statusService"));
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, services_1.default)(app);
    (0, user_1.default)(app);
    (0, role_1.default)(app);
    (0, statusService_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map