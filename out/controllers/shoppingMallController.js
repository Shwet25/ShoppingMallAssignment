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
const db_1 = __importDefault(require("../db/db"));
const logger_1 = __importDefault(require("../logger/logger"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const error_1 = require("../helpers/error");
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
                    // res.status(409).json({
                    //     "payload": [
                    //         {
                    //             "Message": "Employee Already Exists"
                    //         }
                    //     ],
                    //     "errors": [
                    //     ],
                    //     "success": true
                    // })
                    throw new error_1.PrimaryKeyViolation();
                }
                else {
                    if (password == null || password.length < 9) {
                        throw new error_1.PasswordValidation();
                    }
                    const insert = yield (0, db_1.default)(`insert into employee values ('${name}','${email}','${phone}','${nationalid}','${password}')`);
                    // console.log(insert);
                    if (insert != undefined) {
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
                    else {
                        throw new error_1.UniqueKeyViolation();
                    }
                }
            }
            catch (e) {
                // console.log(e)
                if (e instanceof error_1.UniqueKeyViolation || e instanceof error_1.PrimaryKeyViolation || e instanceof error_1.PasswordValidation) {
                    // res.send(e.message)
                    res.status(409).json({
                        "payload": [
                            {
                                "Message": e.message
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
                }
                logger_1.default.error(e);
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
                    // res.status(404).json({
                    //     "payload": [
                    //         {
                    //             "Message": "Employee Does Not Exist. Login Failed"
                    //         }
                    //     ],
                    //     "errors": [
                    //     ],
                    //     "success": false
                    // })
                    throw new error_1.EmployeeNotFound();
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
                                "Message": `Logged in successfully with email id:  ${email} `,
                                "Token": `${token}`
                            }
                        ],
                        "errors": [],
                        "success": true
                    });
                }
            }
            catch (e) {
                if (e instanceof error_1.EmployeeNotFound) {
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": e.message
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
                }
                logger_1.default.error(e);
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
                    // res.status(404).json({
                    //     "payload": [
                    //         {
                    //             "Message": "Invalid Employee Details"
                    //         }
                    //     ],
                    //     "errors": [
                    //     ],
                    //     "success": false
                    // })
                    throw new error_1.InvalidEmployee();
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
                if (e instanceof error_1.InvalidEmployee) {
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": e.message
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
                }
                logger_1.default.error(e);
                // Errors.errors(e,req,res);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let name = req.body.name;
                let email = req.body.email;
                let phone = req.body.phone;
                let password = req.body.password;
                const find = yield (0, db_1.default)(`select * from employee where email='${email}'`);
                if (find.rowCount == 0) {
                    // res.status(404).json({
                    //     "payload": [
                    //         {
                    //             "Message": "Employee Not Found"
                    //         }
                    //     ],
                    //     "errors": [
                    //     ],
                    //     "success": false
                    // })
                    throw new error_1.EmployeeNotFound();
                }
                else {
                    if (name == undefined || name == "" || name == null) {
                        name = find.rows[0].name;
                    }
                    if (phone == undefined || phone == "" || phone == null) {
                        phone = find.rows[0].phone;
                    }
                    if (password == undefined || password == "" || password == null) {
                        password = find.rows[0].password;
                    }
                    yield (0, db_1.default)(`update employee set name='${name}', phone='${phone}', password='${password}' where email='${email}'`);
                    res.status(200).json({
                        "payload": [
                            {
                                "Message": "Employee Updated"
                            }
                        ],
                        "errors": [],
                        "success": true
                    });
                }
            }
            catch (e) {
                if (e instanceof error_1.EmployeeNotFound) {
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": e.message
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
                }
                logger_1.default.error(e);
                // Errors.errors(e,req,res);
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let email = req.body.email;
                const find = yield (0, db_1.default)(`select * from employee where email='${email}'`);
                if (find.rowCount == 0) {
                    // res.status(404).json({
                    //     "payload": [
                    //         {
                    //             "Message": "Employee Does Not Exist"
                    //         }
                    //     ],
                    //     "errors": [
                    //     ],
                    //     "success": false
                    // })
                    throw new error_1.EmployeeNotFound();
                }
                else {
                    yield (0, db_1.default)(`delete from employee where email='${email}'`);
                    res.status(200).json({
                        "payload": [
                            {
                                "Message": `Employee deleted successfully with email id:  ${email} `,
                            }
                        ],
                        "errors": [],
                        "success": true
                    });
                }
            }
            catch (e) {
                if (e instanceof error_1.EmployeeNotFound) {
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": e.message
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
                }
                logger_1.default.error(e);
                // Errors.errors(e,req,res);
            }
        });
    }
    static employees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)('select * from employee');
                if (result.rowCount == 0) {
                    // res.status(200).json({
                    //     "payload": [
                    //         {
                    //             "Message": "No Employees"
                    //         }
                    //     ],
                    //     "errors": [
                    //     ],
                    //     "success": "success"
                    // })
                    throw new error_1.NoEmployees();
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
                if (e instanceof error_1.NoEmployees) {
                    res.status(404).json({
                        "payload": [
                            {
                                "Message": e.message
                            }
                        ],
                        "errors": [],
                        "success": false
                    });
                }
                logger_1.default.error(e);
                // Errors.errors(e,req,res);
            }
        });
    }
}
exports.default = shoppingMallController;
