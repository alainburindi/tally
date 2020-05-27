import { validateSignup } from "../helpers/validation";
import bcrypt from "bcrypt";
import generateToken from "../helpers/generatetoken";
import models from "../models";

const { User } = models;

const signup = async (req, res) => {
  const { error, value } = validateSignup(req.body);
  if (error)
    return res.status(400).json({ status: 400, message: error.message });

  const user = await User.findByEmail(value.email);
  console.log(user);
  if (user)
    return res
      .status(400)
      .json({ status: 400, message: "The email is already used" });

  const saltRounds = process.env.BCRYPT_SALT || 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  value.password = hashedPassword;
  const newUser = await User.create({
    ...value,
  });
  const token = generateToken({ id: newUser.id, email: newUser.email });
  return res.json({ message: "account created", token: token });
};

export { signup };
