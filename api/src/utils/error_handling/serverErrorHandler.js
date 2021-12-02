const serverErrorHandler = (err, req, res, next) => {
  // const statusCode = err.output.statusCode || 500;

  // This function is currently under construction

  next(err);
};

export default serverErrorHandler;
