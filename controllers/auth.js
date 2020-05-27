import { validateSignup, validateLogin } from "../helpers/validation";
import bcrypt from "bcrypt";
import generateToken from "../helpers/generatetoken";
import models from "../models";
import sendResponse from "../helpers/sendResponse";

const { User } = models;

const signup = async (req, res) => {
  const { error, value } = validateSignup(req.body);
  if (error) return sendResponse(res, 400, error.message);

  const user = await User.findByEmail(value.email);

  if (user) return sendResponse(res, 400, "The email is already used");

  const saltRounds = process.env.BCRYPT_SALT || 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  value.password = hashedPassword;
  const newUser = await User.create({
    ...value,
  });
  const token = generateToken({ id: newUser.id, email: newUser.email });
  return sendResponse(res, 201, "account created", { token: token });
};

const login = async (req, res) => {
  const { error, value } = validateLogin(req.body);
  if (error) return sendResponse(res, 400, error.message);

  const user = await User.findByEmail(value.email);

  if (user) {
    const isValid = bcrypt.compareSync(value.password, user.password);
    if (!isValid) return sendResponse(res, 400, "Invalid credentials");

    const token = generateToken({ id: user.id, email: user.email });
    return sendResponse(res, 200, "logged in succesfully ", { token: token });
  }
  return sendResponse(res, 400, "Invalid credentials");
};

export { signup, login };
