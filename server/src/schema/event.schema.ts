import { object, string, TypeOf } from "zod";

export const createEventSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    start: string({ required_error: "Start date is required" }),
    end: string({ required_error: "End date is required" }),
  }),
});

export type CreateEventInput = TypeOf<typeof createEventSchema>["body"];
