import Joi from "@hapi/joi";

const validateSignup = (data) => {
  const schema = Joi.object({
    username: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),

    password: Joi.string().trim().alphanum().required(),
    confirmPassword: Joi.ref("password"),
  });

  return schema.validate(data);
};

export { validateSignup };
