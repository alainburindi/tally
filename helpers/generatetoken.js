import jwt from "jsonwebtoken";

const generateToken = (data) => jwt.sign(data, process.env.JWT_SECRET);

export default generateToken;
