const express=require('express');
const router=express.Router();
const{createUser,login,authenticateUser,authenticateAdmin,logout,resetPasswordRequest}=require('../../controller/user/auth')
const { checkTokenAndLoggedStatus} =require('../../middleware/helperfunction')
const {validateRegistrationRequest,isRegistrationRequestValidated} =require('../../middleware/validation/validateUserRegistration');
const {validateLoginRequest,isLoginRequestValidated} =require('../../middleware/validation/validateLoginRequest');
const { isAdmin } = require('../../middleware/authRole');



router.post('/create-user',validateRegistrationRequest,isRegistrationRequestValidated,checkTokenAndLoggedStatus,isAdmin,createUser);
router.post('/isUserAuthenticated',checkTokenAndLoggedStatus,authenticateUser)
router.post('/admin/authenticateadmin',checkTokenAndLoggedStatus,isAdmin,authenticateAdmin)
router.post('/login',validateLoginRequest,isLoginRequestValidated,login)
router.post('/logout',logout)
router.post('/request-forgot-password-link',resetPasswordRequest)




module.exports=router