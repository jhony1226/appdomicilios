"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = __importDefault(require("../loaders/postgresql"));
const logger_1 = __importDefault(require("../loaders/logger"));
class statusServiceDalService {
    async registerStatusService(statusService) {
        const query = {
            text: `INSERT INTO status_service(name) VALUES('${statusService.name}')`
        };
        try {
            const res = await postgresql_1.default.query(query);
            if (res.rowCount >= 1)
                return statusService;
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    getStatusServices() {
        throw new Error('Method not implemented.');
    }
    updateStatusService(statusService) {
        throw new Error('Method not implemented.');
    }
    deleteStatusService(statusService) {
        throw new Error('Method not implemented.');
    }
    findStatusService(statusService) {
        throw new Error('Method not implemented.');
    }
}
exports.default = statusServiceDalService;
//# sourceMappingURL=statusService.dal.js.map