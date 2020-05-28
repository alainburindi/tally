import jwt from "jsonwebtoken";

import sendResponse from "../helpers/sendResponse";

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return sendResponse(res, 401, "unauthenticated");
  try {
    const decodedToken = jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch {
    return sendResponse(res, 401, "unauthenticated");
  }
};

export default authenticate;
