import { NextFunction, Request, Response } from "express";
import {
  findEvents,
  createEvent,
  deleteEvent,
  findEvent,
} from "../services/event.service";

export const getEventsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await findEvents(res.locals.user._id);
    res.status(200).json({
      status: "success",
      result: events.length,
      data: {
        events: events.map(
          ({ _id, name, status, location, notes, start, end }) => ({
            id: _id,
            name,
            status,
            location,
            notes,
            start,
            end,
          })
        ),
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await createEvent({
      ...req.body,
      userId: res.locals.user._id,
    });
    res.status(200).json(event);
  } catch (err: any) {
    next(err);
  }
};

export const updateEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, location, status, notes, start, end } = req.body;
    const event = await findEvent(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.name = name;
    event.location = location;
    event.status = status;
    event.notes = notes;
    event.start = start;
    event.end = end;
    event.save();
    res.status(200).json(event);
  } catch (err: any) {
    next(err);
  }
};

export const deleteEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user._id;
    const event = await findEvent(id);
    if (!event) return res.status(404).json({ message: "Event was not found" });
    if (event.userId?.toString() !== userId.toString())
      return res
        .status(403)
        .json({ message: "Event is assigned to another user" });
    await deleteEvent(id);
    res.sendStatus(204);
  } catch (err: any) {
    next(err);
  }
};
