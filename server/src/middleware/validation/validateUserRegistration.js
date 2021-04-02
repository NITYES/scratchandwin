const {check,validationResult}=require('express-validator');

  module.exports.validateRegistrationRequest=[

    check('name')
    .notEmpty().
    withMessage('Name is required.'),

    check('email').isEmail().withMessage('Please Enter a Valid Email'),

    check('mobile')
    .notEmpty().isNumeric().withMessage('Enter a valid mobile number').isLength({min:10}).isLength({max:10}).withMessage('Please Enter a valid mobile number'),

    check('password')
    .isLength({min:6})
    .withMessage('Password must be 6 Character long'),

    check('address')
    .notEmpty()
    .withMessage('please provide your address'),

    check('shop').escape()
];

module.exports.isRegistrationRequestValidated=(req,res,next)=>{

    const errors=validationResult(req);
    if(errors.array().length > 0){
        return  res.status(400).json({
            error:errors.array()[0].msg
        })
      }
    else{ 
       next();
    }
}