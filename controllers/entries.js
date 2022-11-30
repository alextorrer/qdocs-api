const Entry = require('../models/Entry');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../util/errorResponse');

//@desc         Get Entries
//@route        Get /api/v1/entries
//@access       Private
exports.getEntries = asyncHandler(async (req, res, next)=>{
    const entries = await Entry.find();

    res.status(200).json({
        success: true,
        data: entries
    });
});

//@desc         Get Single Entry
//@route        Get /api/v1/entries/:id
//@access       Private
exports.getEntry = asyncHandler(async (req, res, next)=>{
    const entry = await Entry.findById(req.params.id);

    if(!entry){
        return next(new ErrorResponse(`Entry not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: entry
    });
});

//@desc         Create Entry
//@route        POST /api/v1/entries
//@access       Private
exports.createEntry = asyncHandler(async (req, res, next)=>{
    const entry = await Entry.create(req.body);

    res.status(201).json({
        success: true,
        data: entry
    });
});

//@desc         Update Entry
//@route        PUT /api/v1/entries/:id
//@access       Private
exports.updateEntry = asyncHandler(async (req, res, next)=>{
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!entry){
        return next(new ErrorResponse(`Entry not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: entry
    });
});

//@desc         Delete Entry
//@route        DELETE /api/v1/entries/:id
//@access       Private
exports.deleteEntry = asyncHandler(async (req, res, next)=>{
    const entry = await Entry.findByIdAndRemove(req.params.id);

    if(!entry){
        return next(new ErrorResponse(`Entry not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data:{}
    });
});