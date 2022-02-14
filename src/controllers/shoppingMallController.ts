import { Response, Request } from "express"

import query from "../db/db";
import logger from "../logger/logger";

import signToken from "../helpers/jwt"


export default class shoppingMallController {
    static async register(req: Request, res: Response) {
        try {
            let name: any = req.body.name;
            let email: any = req.body.email;
            let phone: any = req.body.phone;
            let nationalid: any = req.body.nationalid;
            let password: any = req.body.password;

            const find = await query(`select * from employee where email='${email}'`)

            if (find.rowCount > 0) {
                res.status(409).json({
                    "payload": [
                        {
                            "Message": "Employee Already Exists"
                        }
                    ],
                    "errors": [

                    ],
                    "success": true

                })
            } else {
                await query(`insert into employee values ('${name}','${email}','${phone}','${nationalid}','${password}')`)
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
        } catch (e) {
            logger.error(e)
        }
    }

    static async login(req: Request, res: Response) {
        try {
            let email: any = req.body.email;
            let password: any = req.body.password;

            const find = await query(`select * from employee where email='${email}' and password='${password}'`);

            if (find.rowCount == 0) {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": "Employee Does Not Exist. Login Failed"
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
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
            logger.error(e)
        }
    }

    static async validate(req: Request, res: Response) {
        try {
            let email: any = req.body.email;
            let phone: any = req.body.phone;
            let nationalid: any = req.body.nationalid;

            const find = await query(`select * from employee where email='${email}' and phone='${phone}' and nationalid='${nationalid}'`);

            if (find.rowCount == 0) {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": "Invalid Employee Details"
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
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
            logger.error(e)
        }
    }

    static async update(req: Request, res: Response) {
        try {
            let name: any = req.body.name;
            let email: any = req.body.email;
            let phone: any = req.body.phone;
            let password: any = req.body.password;

            const find = await query(`select * from employee where email='${email}'`);

            if (find.rowCount == 0) {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": "Employee Not Found"
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
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
            logger.error(e)
        }


    }

    static async delete(req: Request, res: Response) {
        try {
            let email = req.body.email;
            const find = await query(`select * from employee where email='${email}'`);

            if (find.rowCount == 0) {
                res.status(404).json({
                    "payload": [
                        {
                            "Message": "Employee Does Not Exist"
                        }
                    ],
                    "errors": [

                    ],
                    "success": false

                })
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
            logger.error(e)
        }
    }

    static async employees(req: Request, res: Response) {
        try {
            const result = await query('select * from employee');
            if (result.rowCount == 0) {
                res.status(200).json({
                    "payload": [
                        {
                            "Message": "No Employees"
                        }
                    ],
                    "errors": [

                    ],
                    "success": "success"

                })
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
            logger.error(e)
        }
    }
}
