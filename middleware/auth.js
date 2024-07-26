const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authN = async (req, res, next) => {
  try {
    const token = req.headers.access_token;

    if (!token) {
      throw { name: "Unauthorized" };
    }

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.userData = {
      id: payload.id,
      email: payload.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const adminAuth = (req, res, next) => {
  if (req.userData.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authN, adminAuth };
