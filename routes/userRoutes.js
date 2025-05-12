import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/api/users", (req, res, next) => {
  try {
    const users = userService.getAll();
    res.data = users;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

router.get("/api/users/:id", (req, res, next) => {
  try {
    const user = userService.getById(req.params.id);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    res.data = user;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

router.post("/api/users", createUserValid, (req, res, next) => {
  try {
    const created = userService.create(req.body);
    res.data = created;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

router.patch("/api/users/:id", updateUserValid, (req, res, next) => {
  try {
    const updated = userService.update(req.params.id, req.body);
    res.data = updated;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

router.delete("/api/users/:id", (req, res, next) => {
  try {
    const deleted = userService.delete(req.params.id);
    res.data = deleted;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

export { router };
