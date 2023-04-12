const Joi = require('joi');

const postSchema = Joi.object({
    content: Joi.string().min(10).required(),
    img_url: Joi.string().uri().required(),
});

module.exports = postSchema;