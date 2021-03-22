const createError = require('http-errors');
const {sample} = require('../models/sample');
const {HttpCodes, CustomErrors}=require('../response');
const jwt =require("jsonwebtoken");


async function sampleGet(req, res, next) {
    try {
        var sampleModel = await sample.findOne({});
        return res.status(HttpCodes.OK).send({
            'response': {
              'message': 'samples fetched',
              "response":sampleModel
            },
          });
    } catch (ex) {
      next(ex)
    }
}


module.exports = {
    sampleGet
};
