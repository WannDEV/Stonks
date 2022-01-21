import jwt from "jsonwebtoken";
import boom from "@hapi/boom";

const validateRequestJWT = (req, res, next) => {
  var accessToken = req.cookies.accessToken;
  var refreshToken = req.cookies.refreshToken;

  if (accessToken) {
    try {
      res.locals.decodedAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_ACCESS_TOKEN
      );
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        if (refreshToken) {
          try {
            jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN);
            // res.status(401).json({ message: "Access token expired" });
            next(boom.unauthorized("Access token expired"));
          } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
              // res
              //   .status(401)
              //   .json({ message: "Access and refresh token expired" });
              next(boom.unauthorized("Access and refresh token expired"));
            } else {
              // res.status(400).json({ message: "Refresh token not valid" });
              next(boom.badRequest("Refresh token not valid"));
            }
          }
        } else {
          // res.status(400).json({ message: "Refresh token not valid" });
          next(boom.badRequest("Refresh token not valid"));
        }
      } else {
        // res.status(400).json({ message: "Access token not valid" });
        next(boom.badRequest("Access token not valid"));
      }
    }
  } else {
    // res.status(400).json({ message: "Access token not valid" });
    next(boom.badRequest("Access token not valid"));
  }
};

export default validateRequestJWT;
