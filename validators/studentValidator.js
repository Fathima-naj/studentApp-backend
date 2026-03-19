import Joi from "joi";

export const studentSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  course: Joi.string().required(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  course: Joi.string().optional(),
});