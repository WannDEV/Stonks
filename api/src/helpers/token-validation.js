import jwt from "jsonwebtoken";
import HttpError from "../models/http-error";

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
            new HttpError("Access token expired", 401);
            res.status(401).json({ message: "Access token expired" });
          } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
              new HttpError("Access and refresh token expired", 401);
              res
                .status(401)
                .json({ message: "Access and refresh token expired" });
            } else {
              new HttpError("Refresh token not valid", 400);
              res.status(400).json({ message: "Refresh token not valid" });
            }
          }
        } else {
          new HttpError("Refresh token not valid", 400);
          res.status(400).json({ message: "Refresh token not valid" });
        }
      } else {
        new HttpError("Access token not valid", 400);
        res.status(400).json({ message: "Access token not valid" });
      }
    }
  } else {
    new HttpError("Access token not valid", 400);
    res.status(400).json({ message: "Access token not valid" });
  }
};

export default validateRequestJWT;
