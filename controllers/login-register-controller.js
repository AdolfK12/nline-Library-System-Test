const { User } = require("../models/index");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "NoInput" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "LoginFailed" };
      }

      const passwordValidation = comparePassword(password, user.password);

      if (!passwordValidation) {
        throw { name: "LoginFailed" };
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });

      res.status(200).json({
        access_token: token,
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
        throw { name: "NoInput" };
      }

      if (
        !password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/)
      ) {
        throw { name: "InvalidPassword" };
      }

      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        throw { name: "EmailNotUnique" };
      }

      const role = username.toLowerCase().includes("admin") ? "admin" : "user";
      const hashedPassword = hashPassword(password);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
