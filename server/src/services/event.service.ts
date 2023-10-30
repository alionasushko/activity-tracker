import eventModel, { Event } from "../models/event.model";

interface GroupedEvent {
  date: string;
  completed: number;
  incompleted: number;
}

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

export const findEventsByDateRange = async (
  userId: string,
  startDate: string,
  endDate: string
) => {
  const $gte = new Date(startDate).setUTCHours(0, 0, 0, 0);
  const $lt = new Date(endDate).setUTCHours(23, 59, 59, 999);

  return await eventModel.find({
    userId,
    start: {
      $gte,
      $lt,
    },
  });
};

export const getEventsStatistics = (events: Event[]) => {
  const eventsByStartDate: Record<string, GroupedEvent> = {};

  events.forEach((event) => {
    const formattedStartDate = event.start.toISOString().split("T")[0];
    const status = event.status;

    if (!eventsByStartDate[formattedStartDate]) {
      eventsByStartDate[formattedStartDate] = {
        date: formattedStartDate,
        completed: 0,
        incompleted: 0,
      };
    }

    if (status === "complete") {
      eventsByStartDate[formattedStartDate].completed++;
    } else if (status === "incomplete") {
      eventsByStartDate[formattedStartDate].incompleted++;
    }
  });

  const groupedEvents: GroupedEvent[] = Object.values(eventsByStartDate);
  groupedEvents.sort((a, b) => a.date.localeCompare(b.date));
  return groupedEvents;
};

export const countEventsByDateRange = async (
  userId: string,
  startDate: string,
  endDate: string,
  status: string
) => {
  const $gte = new Date(startDate).setUTCHours(0, 0, 0, 0);
  const $lt = new Date(endDate).setUTCHours(23, 59, 59, 999);

  return await eventModel.count({
    userId,
    start: {
      $gte,
      $lt,
    },
    status,
  });
};
