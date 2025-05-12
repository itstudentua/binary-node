import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { status: 400, message: "Email and password are required" };
      }

      const user = await authService.login(email, password);

      if (!user) {
        throw { status: 404, message: "User not found or invalid credentials" };
      }

      res.data = user;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
