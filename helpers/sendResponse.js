const sendResponse = (res, status, message, data) => {
  res.status(status).json({ status, message: message, ...data });
};

export default sendResponse;
