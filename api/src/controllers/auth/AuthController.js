import jwt from "jsonwebtoken";
import boom from "@hapi/boom";

import User from "../../db/models/user";

const AuthController = {
  async googleLogin(req, res, next) {
    if (!req.user) {
      // return res.status(401).send({ error: "User was not authenticated" });
      return next(boom.unauthorized("User was not authenticated"));
    }
    const { email } = req.user;
    const user = await User.findOne({ email });
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: 1000,
      }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      {
        expiresIn: 3000,
      }
    );
    res.cookie("refreshToken", `${refreshToken}`, {
      httpOnly: true,
    });
    return res.status(200).send({ accessToken, refreshToken, user });
  },

  async refreshToken(req, res, next) {
    try {
      const token = req.cookies.refreshToken;
      if (token) {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN);
        const accessToken = jwt.sign(
          { id },
          process.env.JWT_SECRET_ACCESS_TOKEN,
          { expiresIn: 1000 }
        );
        return res.status(200).send({ accessToken });
      }
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        // return res.status(401).json({ message: "Refresh token expired" });
        return next(boom.unauthorized("Refresh token expired"));
      } else {
        // return res.status(400).json({ message: "Refresh token not valid" });
        return next(boom.unauthorized("Refresh token not valid"));
      }
    }
  },
  async logout(req, res, next) {
    res.clearCookie("refreshToken");

    return res.sendStatus(200);
  },
  async getUser(req, res, next) {
    var decoded = jwt.decode(req.cookies.accessToken);
    const id = decoded.id;

    const user = await User.findOne({ id });

    if (user) {
      return res.status(200).send(user);
    } else {
      return next(boom.notFound("Could not find user in the database"));
    }
  },
};

export default AuthController;
