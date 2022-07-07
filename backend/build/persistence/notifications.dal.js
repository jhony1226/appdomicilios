"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = __importDefault(require("../loaders/postgresql"));
const logger_1 = __importDefault(require("../loaders/logger"));
class NotificationDalService {
    async registerNotification(noti) {
        console.log(noti);
        const query = {
            text: `INSERT INTO notificacion(status,id_servicio,title,subtitle,descripcion,fecha) VALUES(${noti.status},${noti.idService},'${noti.title}','${noti.subtitle}','${noti.descripcion}','${noti.fecha}')RETURNING ID`
        };
        try {
            const res = await postgresql_1.default.query(query);
            // console.log(res.rows);
            if (res.rowCount >= 1) {
                const id = res.rows[0];
                return { ...id, ...noti };
            }
        }
        catch (error) {
            logger_1.default.error(`Error SQL notification => ${error}`);
            throw error;
        }
    }
    getNotification() {
        throw new Error('Method not implemented.');
    }
}
exports.default = NotificationDalService;
//# sourceMappingURL=notifications.dal.js.map