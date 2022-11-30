const Database = require('../models/Database');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../util/errorResponse');

//@desc         Get Databases
//@route        Get /api/v1/databases
//@access       Private
exports.getDatabases = asyncHandler(async (req, res, next)=>{
    const databases = await Database.find();

    res.status(200).json({
        success: true,
        data: databases
    });
});

//@desc         Get Single Database
//@route        Get /api/v1/databases/:id
//@access       Private
exports.getDatabase = asyncHandler(async (req, res, next)=>{
    const database = await Database.findById(req.params.id);

    if(!database){
        return next(new ErrorResponse(`Database not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: database
    });
});

//@desc         Create Database
//@route        POST /api/v1/databases
//@access       Private
exports.createDatabase = asyncHandler(async (req, res, next)=>{
    const database = await Database.create(req.body);

    res.status(201).json({
        success: true,
        data: database
    });
});

//@desc         Update Database
//@route        PUT /api/v1/databases/:id
//@access       Private
exports.updateDatabase = asyncHandler(async (req, res, next)=>{
    const database = await Database.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!database){
        return next(new ErrorResponse(`Database not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: database
    });
});

//@desc         Delete Database
//@route        DELETE /api/v1/databases/:id
//@access       Private
exports.deleteDatabase = asyncHandler(async (req, res, next)=>{
    const database = await Database.findByIdAndRemove(req.params.id);

    if(!database){
        return next(new ErrorResponse(`Database not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data:{}
    });
});