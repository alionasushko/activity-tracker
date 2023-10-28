import eventModel, { Event } from "../models/event.model";

export const findEvents = async (userId: string) => {
  return await eventModel.find({ userId });
};

export const createEvent = async (input: Partial<Event>) => {
  const event = await eventModel.create(input);
  return event.toJSON();
};

export const findEvent = async (id: string) => {
  return await eventModel.findById(id);
};

export const deleteEvent = async (id: string) => {
  return await eventModel.deleteOne({ _id: id });
};
