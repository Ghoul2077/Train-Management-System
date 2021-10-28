import NextCors from "nextjs-cors";
import dbConnect from "../../lib/mongoose";
import Trains from "../../models/trains";
import Bookings from "../../models/bookings";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { id } = req.query;

        const trains = id
          ? await Trains.find({ _id: id })
          : await Trains.find({});

        const trainsDataWithUpdatedSeats = await Promise.all(
          trains.map(async (train) => {
            const bookingsData = await Bookings.find({ train_id: train._id });
            const totalSeatsBooked = bookingsData.reduce(
              (total, curr) => total + curr["seats_booked"].length,
              0
            );
            return {
              ...train["_doc"],
              seatsLeft: train.seats - totalSeatsBooked,
            };
          })
        );

        res.status(200).json({
          success: true,
          data: id ? trainsDataWithUpdatedSeats[0] : trainsDataWithUpdatedSeats,
        });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
