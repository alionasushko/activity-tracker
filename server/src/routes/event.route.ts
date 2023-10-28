import express from "express";
import {
  getEventsHandler,
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controllers/event.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createEventSchema } from "../schema/event.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get("/", getEventsHandler);

router.post("/", validate(createEventSchema), createEventHandler);

router.put("/", validate(createEventSchema), updateEventHandler);

router.delete("/:id", deleteEventHandler);

export default router;
