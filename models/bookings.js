import Mongoose from "mongoose";

const bookings = new Mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    train_id: { type: Mongoose.Schema.Types.ObjectId, required: true },
    seats_booked: [Number],
  },
  { timestamps: true }
);

module.exports =
  Mongoose.models.bookings || Mongoose.model("bookings", bookings);
