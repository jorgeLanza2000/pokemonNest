import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  DEFAULT_LIMIT: Joi.number().default(7),
});
