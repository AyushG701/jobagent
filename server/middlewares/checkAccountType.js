// middleware/checkAccountType.js
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const checkAccountType = (requiredAccountType) => {
  return async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, "your_secret_key"); // use your actual secret key
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.accountType !== requiredAccountType) {
        return res
          .status(403)
          .json({ message: "Access denied: Incorrect account type" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  };
};

export default checkAccountType;
