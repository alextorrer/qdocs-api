const Template = require('../models/Template');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../util/errorResponse');

//@desc         Get Templates
//@route        Get /api/v1/templates
//@access       Private
exports.getTemplates = asyncHandler(async (req, res, next)=>{
    const templates = await Template.find();

    res.status(200).json({
        success: true,
        data: templates
    });
});

//@desc         Get Single Template
//@route        Get /api/v1/templates/:id
//@access       Private
exports.getTemplate = asyncHandler(async (req, res, next)=>{
    const template = await Template.findById(req.params.id);

    if(!template){
        return next(new ErrorResponse(`Template not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: template
    });
});

//@desc         Create Template
//@route        POST /api/v1/templates
//@access       Private
exports.createTemplate = asyncHandler(async (req, res, next)=>{
    const template = await Template.create(req.body);

    res.status(201).json({
        success: true,
        data: template
    });
});

//@desc         Update Template
//@route        PUT /api/v1/templates/:id
//@access       Private
exports.updateTemplate = asyncHandler(async (req, res, next)=>{
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!template){
        return next(new ErrorResponse(`Template not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: template
    });
});

//@desc         Delete Template
//@route        DELETE /api/v1/templates/:id
//@access       Private
exports.deleteTemplate = asyncHandler(async (req, res, next)=>{
    const template = await Template.findByIdAndRemove(req.params.id);

    if(!template){
        return next(new ErrorResponse(`Template not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data:{}
    });
});