import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const decodedToken = jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch {
    next();
  }
};

export default optionalAuth;
