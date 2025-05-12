import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// Отримати всіх бійців
router.get("/api/fighters", (req, res, next) => {
  try {
    const fighters = fighterService.getAll();
    res.data = fighters;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

// Отримати бійця за id
router.get("/api/fighters/:id", (req, res, next) => {
  try {
    const fighter = fighterService.getById(req.params.id);
    if (!fighter) {
      throw { status: 404, message: "Fighter not found" };
    }
    res.data = fighter;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

// Створити бійця
router.post("/api/fighters", createFighterValid, (req, res, next) => {
  try {
    const newFighter = fighterService.create(req.body);
    res.data = newFighter;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

// Оновити бійця
router.patch("/api/fighters/:id", updateFighterValid, (req, res, next) => {
  try {
    const updatedFighter = fighterService.update(req.params.id, req.body);
    res.data = updatedFighter;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

// Видалити бійця
router.delete("/api/fighters/:id", (req, res, next) => {
  try {
    const deleted = fighterService.delete(req.params.id);
    res.data = deleted;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

export { router };
