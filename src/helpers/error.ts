export default class Errors {

    static async errors(err: any, req: any, res: any) {
        res.status(err.statusCode).send(err.message)
    }
}



