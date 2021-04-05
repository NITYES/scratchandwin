const {check,validationResult}=require('express-validator');

  module.exports.validateLoginRequest=[

    

    check('email').isEmail().withMessage('Please Enter a Valid Email'),

    check('password').notEmpty()
    .isLength({min:6})
    .withMessage('Password must be six character long'),

   
];

module.exports.isLoginRequestValidated=(req,res,next)=>{

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