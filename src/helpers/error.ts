export class UniqueKeyViolation extends Error {
    constructor(message: string="Unique Key Violation. Please enter Unique values for phone number and national id") {
      super(message);
      Object.setPrototypeOf(this, UniqueKeyViolation.prototype)
    }
  }

  export  class PrimaryKeyViolation extends Error {
    constructor(message: string="Primary Key Violation. Please try with another email id as this email id already has an account") {
      super(message);
      Object.setPrototypeOf(this, PrimaryKeyViolation.prototype)
    }
  }
  
  export class EmployeeNotFound extends Error {
    constructor(message: string="Employee does not exist. Please signup to login with this email id") {
      super(message);
      Object.setPrototypeOf(this, EmployeeNotFound.prototype)
    }
  }

  export class PasswordValidation extends Error {
    constructor(message: string="Invalid Password. Your password should be of more than 8 characters") {
      super(message);
      Object.setPrototypeOf(this, PasswordValidation.prototype)
    }
  }

  export class InvalidEmployee extends Error {
    constructor(message: string="Invalid Employee Details. Please try again by providing correct credentials") {
      super(message);
      Object.setPrototypeOf(this, InvalidEmployee.prototype)
    }
  }

  export class NoEmployees extends Error {
    constructor(message: string="There are no employee records in database") {
      super(message);
      Object.setPrototypeOf(this, NoEmployees.prototype)
    }
  }









