"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const logger_1 = __importDefault(require("../logger/logger"));
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    database: 'shoppingmall',
    host: 'localhost',
    port: '5432',
    min_pool_size: 5,
    reserve_pool_size: 5,
    server_idle_timeout: 300,
    idle_transaction_timeout: 300,
    max_client_conn: 10
});
function query(queryText) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            yield client.query('BEGIN');
            const res = yield client.query(queryText);
            yield client.query('COMMIT');
            return res;
        }
        catch (e) {
            yield client.query('ROLLBACK');
            logger_1.default.error(e);
        }
        finally {
            client.release();
        }
    });
}
// import { env } from "process";
// const Pool = require('pg').Pool
// // const pool = new Pool({
// //   user: env.DB_USER || 'postgres',
// //   password: env.DB_PASSWORD || 'postgres',
// //   database: env.DB_NAME || 'config',
// //   host: env.DB_HOST || 'localhost',
// //   port: env.DB_PORT || '5432'
// // })
// // const client =pool.connect();
exports.default = query;
