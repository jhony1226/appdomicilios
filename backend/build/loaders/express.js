"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("../api"));
const config_1 = __importDefault(require("../config"));
//var path = require('path');
exports.default = ({ app }) => {
    app.get('/status', (req, res) => {
        res.json({ peticion: 'exitosa' }).status(200).end();
    });
    app.head('/status', (req, res) => {
        res.json({ peticion: 'exitosa' }).status(200).end();
    });
    app.enable('trust proxy');
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.static('public'));
    // app.get("*",(req,res)=>{ 
    // res.sendFile(path.resolve(__dirname,'../../public/index.html'));
    //})
    app.use(config_1.default.api.prefix, (0, api_1.default)());
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    /// error handlers
    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
    //app.use(express.static('../../public'))
};
//# sourceMappingURL=express.js.map