export function catchAsync(
  controllerFn,
  { message = "Internal Server error", status = 500 }
) {
  return (req, res, next) =>
    controllerFn(req, res, next).catch((error) => {
      console.log(error);
      res.status(status).json({
        success: false,
        error,
        message: error.message || message,
      });
    });
}
