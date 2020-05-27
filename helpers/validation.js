import Joi from "@hapi/joi";

const validateSignup = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
    confirmPassword: Joi.ref("password"),
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
  });

  return schema.validate(data);
};

export { validateSignup, validateLogin };
