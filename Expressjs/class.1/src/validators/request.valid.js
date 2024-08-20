const { body, query } = require('express-validator');

const signupRouteValidator = [
    body("username").trim().isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters').matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").trim().isLength({min : 6}).withMessage("Password must be 6 char"),
]

// const createTodoRouteValidator = [
//     body("name").isLength({ min: 5, max : 15 }).matches(/^[A-Za-z0-9 .,'!&]+$/),
//     body("description").isLength({min: 15, max : 50}),
//     body("color").matches(/^#([0-9a-f]{3}){1,2}$/i),
//     body("enddate")
// ]

module.exports={
    signupRouteValidator,
    // createTodoRouteValidator
}