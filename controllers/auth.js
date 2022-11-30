const User = require('../models/User');
const asyncHandler = require('../middleware/async');

//@desc         Register user
//@route        POST /api/v1/auth/register
//@access       Public
exports.login = asyncHandler(async (req, res, next)=>{
    console.log('Login request');
});