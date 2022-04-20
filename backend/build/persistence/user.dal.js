"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = __importDefault(require("../loaders/postgresql"));
const logger_1 = __importDefault(require("../loaders/logger"));
class UserDalService {
    async updateUser(user) {
        const query = {
            text: 'UPDATE users SET id_role=$1, name=$2, phone=$3, email=$4, password=$5, status=$6 WHERE id=$7',
            values: [user.idRole, user.name, user.phone, user.email, user.password, user.status, user.idUser]
        };
        try {
            const res = await postgresql_1.default.query(query);
            if (res.rowCount == 1)
                return user;
        }
        catch (error) {
            return error;
        }
    }
    ;
    async deleteUser(user) {
        const query = {
            text: 'update users set status=$1 where id=$2',
            values: [user.status, user.idUser]
        };
        try {
            const res = await postgresql_1.default.query(query);
            if (res.rowCount >= 1)
                return user;
        }
        catch (error) {
            return error;
        }
    }
    async getUsers() {
        try {
            const query = {
                text: 'select * from users',
            };
            const res = await postgresql_1.default.query(query);
            return res.rows;
        }
        catch (error) {
            throw 'mensaje';
        }
    }
    async getDeliverys() {
        try {
            const query = {
                text: 'select * from users where id_role=$1',
                values: [31]
            };
            const res = await postgresql_1.default.query(query);
            return res.rows;
        }
        catch (error) {
            throw 'mensaje';
        }
    }
    async getClients() {
        try {
            const query = {
                text: 'select * from users where id_role=$1',
                values: [30]
            };
            const res = await postgresql_1.default.query(query);
            return res.rows;
        }
        catch (error) {
            throw 'mensaje';
        }
    }
    ;
    async registerUser(user) {
        const fecha = new Date();
        const query = {
            text: `INSERT INTO USERS(NAME,ID_ROLE,PHONE,EMAIL,PASSWORD,REGISTER_DATE,STATUS) VALUES('${user.name}',${user.idRole},'${user.phone}','${user.email}','${user.password}','2020-01-10', '${user.status}') RETURNING ID`,
            // VALUES:[user.name,user.idRole,user.phone,user.email,user.password,user.registerDate,user.status],
        };
        try {
            const res = await postgresql_1.default.query(query);
            const id = res.rows[0];
            return { ...id, ...user };
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    async findUser(email) {
        try {
            const query = {
                text: 'select * from users  where email=$1',
                values: [email]
            };
            const res = await postgresql_1.default.query(query);
            return res.rows[0];
        }
        catch (error) {
            throw error;
            ;
        }
    }
    ;
    async findUserById(user) {
        try {
            const query = {
                text: 'select * from users  where id=$1',
                values: [user.idUser]
            };
            const res = await postgresql_1.default.query(query);
            if (res.rowCount >= 1)
                return res.rows[0];
            return undefined;
        }
        catch (error) {
            throw error;
            ;
        }
    }
    ;
    async findEmail(user) {
        try {
            const query = {
                text: 'select * from users  where email=$1 AND id!=$2',
                values: [user.email, user.idUser]
            };
            const res = await postgresql_1.default.query(query);
            return res.rows[0];
        }
        catch (error) {
            throw error;
            ;
        }
    }
    async findPhone(user) {
        try {
            const query = {
                text: 'select * from users  where email=$1 AND id!=$2',
                values: [user.phone, user.idUser]
            };
            const res = await postgresql_1.default.query(query);
            return res.rows[0];
        }
        catch (error) {
            throw error;
            ;
        }
    }
    async registerTokenApk(token) {
        const fecha = new Date();
        const query = {
            text: 'update users set id_token=$1 where id=$2',
            values: [token.token, token.id]
        };
        try {
            const res = await postgresql_1.default.query(query);
            const id = res.rows[0];
            return { ...id, ...token };
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
}
exports.default = UserDalService;
//# sourceMappingURL=user.dal.js.map