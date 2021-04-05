const {check,validationResult}=require('express-validator');

  module.exports.validateCustomerData=[

    check('customerName')
    .notEmpty().
    withMessage('Name is required.'),


    check('customerMobile')
    .notEmpty().isNumeric().withMessage('Please Enter a valid mobile number').isLength({min:10}).withMessage("Please Enter a Valid Number").isLength({max:10}).withMessage('Please Enter a valid mobile number'),


    check('purchasedItems')
   .isArray({min:1,max:30})
    .withMessage('Please Choose Purchased Item'),

    check('totalPurchase').notEmpty().withMessage("Please Enter Amount").isNumeric().withMessage("Please Enter amount").isLength({min:1,max:10}).withMessage("Please Enter A valid Amount")
];

module.exports.isCustomerDataValidated=(req,res,next)=>{

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