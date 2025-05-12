import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/api/fights", (req, res, next) => {
  try {
    const fights = fightersService.getAll();
    res.data = fights;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

router.get("/api/fights/:id", (req, res, next) => {
  try {
    const fight = fightersService.getById(req.params.id);
    if (!fight) {
      throw { status: 404, message: "Fight not found" };
    }
    res.data = fight;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

router.post("/api/fights", (req, res, next) => {
  const { fighter1Id, fighter2Id } = req.body;

  try {
    const newFight = fightersService.createFight(fighter1Id, fighter2Id);
    res.data = newFight;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

router.patch("/api/fights/:id", (req, res, next) => {
  try {
    const updatedFight = fightersService.updateFight(req.params.id, req.body);
    res.data = updatedFight;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

router.delete("/api/fights/:id", (req, res, next) => {
  try {
    const deleted = fightersService.deleteFight(req.params.id);
    res.data = deleted;
  } catch (e) {
    res.err = e;
  }
  next();
}, responseMiddleware);

export { router };
