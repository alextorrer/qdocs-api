const Template = require('../models/Template');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../util/errorResponse');
const formidable = require('formidable');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

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
    const form = formidable({ multiples: true});

    form.parse(req, async (err, fields, files) => {
        //Create template placeholder
        const template = await Template.create(fields);

        //Get file from request
        const file = {...files.file};
        if(!file){
            return next(new ErrorResponse('Please upload a file' ,400));
        }

        if(!file.mimetype.includes('pdf')){
            return next(new ErrorResponse("Please upload a PDF", 400));
        }

        if(!file.size > process.env.MAX_FILE_UPLOAD){
            return next(new ErrorResponse("Please upload an image smaller than "+process.env.MAX_FILE_UPLOAD, 400));
        }

        //Create unique filename
        file.newFilename = `template_${template._id}${path.parse(file.originalFilename).ext}`;
        
        //Upload file to server and insert filename to database
        fs.rename(file.filepath, `${process.env.FILE_UPLOAD_PATH}/${file.newFilename}`, async err => {
            if(err){
                console.error(err);
                return next(new ErrorResponse('Problem with file upload', 500));
            }

            template.file = file.newFilename;
            const newTemplate = await Template.findByIdAndUpdate(template._id, template, {
                new: true
            });

            res.status(201).json({
                success: true,
                data: newTemplate
            });
        })
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

