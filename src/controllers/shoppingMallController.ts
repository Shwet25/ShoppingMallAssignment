import { Response, Request } from "express"

// import client from "../db/db";
import query from "../db/db";
import logger from "../logger/logger";

import signToken from "../helpers/jwt"

// var read: any;

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
            console.log(e)
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
                            "Message": `Logged in successfully with id ${email} `,
                            "Token": `${token}`
                        }
                    ],
                    "errors": [

                    ],
                    "success": true

                })
            }
        } catch (e) {
            console.log(e)
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
            console.log(e);
        }
    }

    static async employees(req: Request, res: Response) {
        try{
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
    }catch(e){
        console.log(e);
    }
}
}
