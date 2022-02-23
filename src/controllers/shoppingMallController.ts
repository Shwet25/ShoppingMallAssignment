import { Response, Request } from "express"

import query from "../db/db";
import logger from "../logger/logger";

import signToken from "../helpers/jwt";

import { UniqueKeyViolation, PrimaryKeyViolation, EmployeeNotFound, PasswordValidation, InvalidEmployee, NoEmployees } from "../helpers/error";

export default class shoppingMallController {

    static async register(req: Request, res: Response) {
        try {
            let name: String = req.body.name;
            let email: String = req.body.email;
            let phone: String = req.body.phone;
            let nationalid: String = req.body.nationalid;
            let password: String = req.body.password;

            const find = await query(`select * from employee where email='${email}'`)

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

                throw new PrimaryKeyViolation();

            } else {

                if (password == null || password.length < 9) {
                    throw new PasswordValidation()
                }

                const insert = await query(`insert into employee values ('${name}','${email}','${phone}','${nationalid}','${password}')`)
                // console.log(insert);
                if (insert != undefined) {
                    res.status(200).json({
                        "payload": [
                            {
                                "Message": "Employee Added Successfully"
                            }
                        ],
                        "errors": [

                        ],
                        "success": true

                    })
                }
                else {

                    throw new UniqueKeyViolation();
                }

            }
        } catch (e) {
            // console.log(e)
            if (e instanceof UniqueKeyViolation || e instanceof PrimaryKeyViolation || e instanceof PasswordValidation) {
                // res.send(e.message)
                res.status(409).json({
                    "payload": [
                        {
                            "Message": e.message
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
            }
            logger.error(e);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            let email: String = req.body.email;
            let password: String = req.body.password;

            const find = await query(`select * from employee where email='${email}' and password='${password}'`);

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

                throw new EmployeeNotFound();

            } else {

                const employeeLogin = {
                    email: find.rows[0].email,
                    password: find.rows[0].password
                }

                const token = signToken(employeeLogin);

                res.status(200).json({
                    "payload": [
                        {
                            "Message": `Logged in successfully with email id:  ${email} `,
                            "Token": `${token}`
                        }
                    ],
                    "errors": [

                    ],
                    "success": true

                })
            }
        } catch (e) {
            if (e instanceof EmployeeNotFound) {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": e.message
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
            }
            logger.error(e);

        }
    }

    static async validate(req: Request, res: Response) {
        try {
            let email: String = req.body.email;
            let phone: String = req.body.phone;
            let nationalid: String = req.body.nationalid;

            const find = await query(`select * from employee where email='${email}' and phone='${phone}' and nationalid='${nationalid}'`);

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
                throw new InvalidEmployee();
            } else {
                res.status(200).json({
                    "payload": [
                        {
                            "Message": "Valid Employee Details"
                        }
                    ],
                    "errors": [

                    ],
                    "success": true

                })
            }

        }
        catch (e) {
            if (e instanceof InvalidEmployee) {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": e.message
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
            }
            logger.error(e);
            // Errors.errors(e,req,res);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            let name: String = req.body.name;
            let email: String = req.body.email;
            let phone: String = req.body.phone;
            let password: String = req.body.password;

            const find = await query(`select * from employee where email='${email}'`);

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

                throw new EmployeeNotFound()
            } else {
                if (name == undefined || name == "" || name == null) {
                    name = find.rows[0].name;
                }
                if (phone == undefined || phone == "" || phone == null) {
                    phone = find.rows[0].phone;
                }
                if (password == undefined || password == "" || password == null) {
                    password = find.rows[0].password;
                }

                await query(`update employee set name='${name}', phone='${phone}', password='${password}' where email='${email}'`);

                res.status(200).json({
                    "payload": [
                        {
                            "Message": "Employee Updated"
                        }
                    ],
                    "errors": [

                    ],
                    "success": true

                })
            }

        } catch (e) {
            if (e instanceof EmployeeNotFound) {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": e.message
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
            }
            logger.error(e);
            // Errors.errors(e,req,res);
        }


    }

    static async delete(req: Request, res: Response) {
        try {
            let email: String = req.body.email;
            const find = await query(`select * from employee where email='${email}'`);

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
                throw new EmployeeNotFound();
            } else {

                await query(`delete from employee where email='${email}'`);

                res.status(200).json({
                    "payload": [
                        {
                            "Message": `Employee deleted successfully with email id:  ${email} `,

                        }
                    ],
                    "errors": [

                    ],
                    "success": true

                })

            }
        } catch (e) {
            if (e instanceof EmployeeNotFound) {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": e.message
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
            }
            logger.error(e);
            // Errors.errors(e,req,res);
        }
    }

    static async employees(req: Request, res: Response) {
        try {
            const result = await query('select * from employee');
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

                throw new NoEmployees();
            } else {
                res.status(200).json({
                    "payload": [
                        {
                            "Employees": result.rows,
                            "Total Employees": result.rowCount
                        }
                    ],
                    "errors": [

                    ],
                    "success": true

                })
            }
        } catch (e) {
            if (e instanceof NoEmployees) {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": e.message
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
            }
            logger.error(e);
            // Errors.errors(e,req,res);
        }
    }
}
