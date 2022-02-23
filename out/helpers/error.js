"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoEmployees = exports.InvalidEmployee = exports.PasswordValidation = exports.EmployeeNotFound = exports.PrimaryKeyViolation = exports.UniqueKeyViolation = void 0;
class UniqueKeyViolation extends Error {
    constructor(message = "Unique Key Violation. Please enter Unique values for phone number and national id") {
        super(message);
        Object.setPrototypeOf(this, UniqueKeyViolation.prototype);
    }
}
exports.UniqueKeyViolation = UniqueKeyViolation;
class PrimaryKeyViolation extends Error {
    constructor(message = "Primary Key Violation. Please try with another email id as this email id already has an account") {
        super(message);
        Object.setPrototypeOf(this, PrimaryKeyViolation.prototype);
    }
}
exports.PrimaryKeyViolation = PrimaryKeyViolation;
class EmployeeNotFound extends Error {
    constructor(message = "Employee does not exist. Please signup to login with this email id") {
        super(message);
        Object.setPrototypeOf(this, EmployeeNotFound.prototype);
    }
}
exports.EmployeeNotFound = EmployeeNotFound;
class PasswordValidation extends Error {
    constructor(message = "Invalid Password. Your password should be of more than 8 characters") {
        super(message);
        Object.setPrototypeOf(this, PasswordValidation.prototype);
    }
}
exports.PasswordValidation = PasswordValidation;
class InvalidEmployee extends Error {
    constructor(message = "Invalid Employee Details. Please try again by providing correct credentials") {
        super(message);
        Object.setPrototypeOf(this, InvalidEmployee.prototype);
    }
}
exports.InvalidEmployee = InvalidEmployee;
class NoEmployees extends Error {
    constructor(message = "There are no employee records in database") {
        super(message);
        Object.setPrototypeOf(this, NoEmployees.prototype);
    }
}
exports.NoEmployees = NoEmployees;
