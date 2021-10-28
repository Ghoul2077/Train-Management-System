import Mongoose from "mongoose";

const trains = new Mongoose.Schema({
  seats: { type: Number, default: 80 },
});

module.exports = Mongoose.models.trains || Mongoose.model("trains", trains);
