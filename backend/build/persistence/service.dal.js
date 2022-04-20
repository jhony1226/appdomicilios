"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = __importDefault(require("../loaders/postgresql"));
const logger_1 = __importDefault(require("../loaders/logger"));
class ServicesDalService {
    async registerService(service) {
        const query = {
            text: `INSERT INTO services(id_client,id_deliv,price,destination,source,observation,id_status,creation_date,closing_date) VALUES(${service.idCliente},${service.idDeliv},${service.price},'${service.destination}','${service.source}','${service.observation}',${service.idStatus},'2021-01-01','2021-01-02')`
        };
        try {
            const res = await postgresql_1.default.query(query);
            if (res.rowCount >= 1)
                return service;
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    ;
    async getServices() {
        try {
            const query = {
                text: 'select s.*, cliente.name as name_client, domi.name as name_deliv,st.name as name_status from services s inner join users as cliente on cliente.id=s.id_client inner join users as domi on domi.id=s.id_deliv inner join status_service as st on st.id_status_service=s.id_status',
            };
            const res = await postgresql_1.default.query(query);
            return res.rows;
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    ;
    async getServicesByDeliv(service) {
        try {
            const query = {
                text: 'select * from services where id_deliv = $1',
                values: [service.idDeliv]
            };
            const res = await postgresql_1.default.query(query);
            if (res.rowCount >= 1)
                return res.rows;
            return undefined;
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    ;
    async deleteService(service) {
        console.log(service);
        console.log("dsf");
        const query = {
            text: 'delete from services where id=$1 ',
            values: [service]
        };
        try {
            const res = await postgresql_1.default.query(query);
            if (res.rowCount >= 1)
                return service;
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    ;
    async updateService(service) {
        const query = {
            text: 'UPDATE services SET id_client=$1, id_deliv=$2, price=$3, destination=$4, source=$5, observation=$6,id_status=$7 WHERE id=$8',
            values: [service.idCliente, service.idDeliv, service.price, service.destination, service.source, service.observation, service.idStatus, service.idService]
        };
        try {
            const res = await postgresql_1.default.query(query);
            if (res.rowCount == 1)
                return service;
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    ;
    async updateStatus(service) {
        const query = {
            text: 'UPDATE services SET id_status=$1 WHERE id=$2',
            values: [service.idStatus, service.idService]
        };
        try {
            const res = await postgresql_1.default.query(query);
            if (res.rowCount == 1)
                return service;
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    ;
    async findService(service) {
        const query = {
            text: 'select * from services where id=$1',
            values: [service]
        };
        try {
            const res = await postgresql_1.default.query(query);
            return res.rows[0];
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    ;
}
exports.default = ServicesDalService;
//# sourceMappingURL=service.dal.js.map