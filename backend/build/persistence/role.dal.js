"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = __importDefault(require("../loaders/postgresql"));
const logger_1 = __importDefault(require("../loaders/logger"));
class RoleDalService {
    async deleteRole(role) {
        try {
            const query = {
                text: 'DELETE FROM roles WHERE id=$1',
                values: [role.id]
            };
            const res = await postgresql_1.default.query(query);
            if (res.rowCount >= 1)
                return role;
        }
        catch (error) {
            throw 'mensaje';
        }
    }
    async getRoles() {
        try {
            const query = {
                text: 'select * from roles',
            };
            const res = await postgresql_1.default.query(query);
            return res.rows;
        }
        catch (error) {
            throw 'mensaje';
        }
    }
    async findRole(role) {
        try {
            const query = {
                text: 'SELECT * FROM roles  WHERE name=$1',
                values: [role.name]
            };
            const res = await postgresql_1.default.query(query);
            return res.rows[0];
        }
        catch (error) {
            throw error;
            ;
        }
    }
    async findRoleById(role) {
        try {
            const query = {
                text: 'SELECT * FROM roles  WHERE id=$1',
                values: [role.id]
            };
            const res = await postgresql_1.default.query(query);
            return res.rows[0];
        }
        catch (error) {
            throw error;
            ;
        }
    }
    async registerRole(Role) {
        const fecha = new Date();
        const query = {
            text: `INSERT INTO roles(name,description,register_date,status) VALUES('${Role.name}','${Role.description}','2021-10-01','${Role.status}')`
            // VALUES:[user.name,user.idRole,user.phone,user.email,user.password,user.registerDate,user.status],
        };
        try {
            const res = await postgresql_1.default.query(query);
            const id = res.rows[0];
            return { ...id, ...Role };
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    async updateRole(role) {
        const query = {
            text: 'UPDATE ROLES SET name=$1,description=$2,status=$3 WHERE id=$4',
            values: [role.name, role.description, role.status, role.id]
        };
        try {
            const res = await postgresql_1.default.query(query);
            if (res.rowCount > 0)
                return role;
        }
        catch (error) {
            logger_1.default.error(`Error SQL => ${error}`);
            throw error;
        }
    }
    ;
}
exports.default = RoleDalService;
//# sourceMappingURL=role.dal.js.map