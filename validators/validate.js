import Joi from "joi";

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false, // show all errors
  });

  if (error) {
    const err = new Error(
      error.details.map((e) => e.message).join(", ")
    );
    err.statusCode = 400;
    return next(err);
  }

  next();
};

export default validate;