export default class MyError extends Error {
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, MyError.prototype)
    }
  }








// export default class Errors {
//     err:any;
//     // req:any;
//     // res:any;

//     constructor(err: any){
//         this.err=err;
//         // this.req=req;
//         // this.res=res;
//         let responseObj:Object={"Error Message": this.err.message};
//         console.log(responseObj);
        
//     }

    

    
    // errors=()=>{
        
    //     this.res.status(this.err.statusCode).send(this.err.message);
    // }

    // function errors() {
    //     res.status(err.statusCode).send(err.message)
    // }



    //  errors= (err: any, req: any, res: any)  =>  {
    //     res.status(err.statusCode).send(err.message)
    // }

    // static async errors(err: any, req: any, res: any) {
    //     res.status(err.statusCode).send(err.message)
    // }
// }

// module.exports={}






