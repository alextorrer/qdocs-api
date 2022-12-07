const Dictionary = require('../models/Dictionary');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../util/errorResponse');

//@desc         Get Dictionaries
//@route        Get /api/v1/dictionaries
//@access       Private
exports.getDictionaries = asyncHandler(async (req, res, next)=>{
    const dictionaries = await Dictionary.find().populate('entries');

    res.status(200).json({
        success: true,
        data: dictionaries
    });
});

//@desc         Get Single Dictionary
//@route        Get /api/v1/dictionaries/:id
//@access       Private
exports.getDictionary = asyncHandler(async (req, res, next)=>{
    const dictionary = await Dictionary.findById(req.params.id).populate('entries');

    if(!dictionary){
        return next(new ErrorResponse(`Dictionary not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: dictionary
    });
});

//@desc         Create Dictionary
//@route        POST /api/v1/dictionaries
//@access       Private
exports.createDictionary = asyncHandler(async (req, res, next)=>{
    const dictionary = await Dictionary.create(req.body);

    res.status(201).json({
        success: true,
        data: dictionary
    });
});

//@desc         Update Dictionary
//@route        PUT /api/v1/dictionaries/:id
//@access       Private
exports.updateDictionary = asyncHandler(async (req, res, next)=>{
    const dictionary = await Dictionary.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!dictionary){
        return next(new ErrorResponse(`Dictionary not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: dictionary
    });
});

//@desc         Delete Dictionary
//@route        DELETE /api/v1/dictionaries/:id
//@access       Private
exports.deleteDictionary = asyncHandler(async (req, res, next)=>{
    const dictionary = await Dictionary.findByIdAndRemove(req.params.id);

    if(!dictionary){
        return next(new ErrorResponse(`Dictionary not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data:{}
    });
});