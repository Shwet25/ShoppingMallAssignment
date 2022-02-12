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
// import client from "../db/db";
const db_1 = __importDefault(require("../db/db"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
// var read: any;
class shoppingMallController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let name = req.body.name;
                let email = req.body.email;
                let phone = req.body.phone;
                let nationalid = req.body.nationalid;
                let password = req.body.password;
                const find = yield (0, db_1.default)(`select * from employee where email='${email}'`);
                if (find.rowCount > 0) {
                    res.status(409).json({
                        "payload": [
                            {
                                "Message": "Employee Already Exists"
                            }
                        ],
                        "errors": [],
                        "success": true
                    });
                }
                else {
                    yield (0, db_1.default)(`insert into employee values ('${name}','${email}','${phone}','${nationalid}','${password}')`);
                    res.status(200).json({
                        "payload": [
                            {
                                "Message": "Employee Added Successfully"
                            }
                        ],
                        "errors": [],
                        "success": true
                    });
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let email = req.body.email;
                let password = req.body.password;
                const find = yield (0, db_1.default)(`select * from employee where email='${email}' and password='${password}'`);
                if (find.rowCount == 0) {
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": "Employee Does Not Exist. Login Failed"
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
                }
                else {
                    const employeeLogin = {
                        email: find.rows[0].email,
                        password: find.rows[0].password
                    };
                    const token = (0, jwt_1.default)(employeeLogin);
                    res.status(200).json({
                        "payload": [
                            {
                                "Message": `Logged in successfully with id ${email} `,
                                "Token": `${token}`
                            }
                        ],
                        "errors": [],
                        "success": true
                    });
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static validate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let email = req.body.email;
                let phone = req.body.phone;
                let nationalid = req.body.nationalid;
                const find = yield (0, db_1.default)(`select * from employee where email='${email}' and phone='${phone}' and nationalid='${nationalid}'`);
                if (find.rowCount == 0) {
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": "Invalid Employee Details"
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
                }
                else {
                    res.status(200).json({
                        "payload": [
                            {
                                "Message": "Valid Employee Details"
                            }
                        ],
                        "errors": [],
                        "success": true
                    });
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static employees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)('select * from employee');
                if (result.rowCount == 0) {
                    res.status(200).json({
                        "payload": [
                            {
                                "Message": "No Employees"
                            }
                        ],
                        "errors": [],
                        "success": "success"
                    });
                }
                else {
                    res.status(200).json({
                        "payload": [
                            {
                                "Employees": result.rows,
                                "Total Employees": result.rowCount
                            }
                        ],
                        "errors": [],
                        "success": true
                    });
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = shoppingMallController;
