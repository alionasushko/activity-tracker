import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the Event class to be used as TypeScript type
export class Event {
  @prop({ required: true })
  name: string;

  @prop({ default: "incomplete" })
  status: string;

  @prop()
  location: string;

  @prop()
  notes: string;

  @prop({ required: true })
  start: Date;

  @prop({ required: true })
  end: Date;

  @prop({ ref: User })
  userId: Ref<User>;
}

// Create the event model from the Event class
const eventModel = getModelForClass(Event);
export default eventModel;
