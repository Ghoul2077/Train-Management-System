import NextCors from "nextjs-cors";
import dbConnect from "../../lib/mongoose";
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
        const bookings = await Bookings.find({});
        res.status(200).json({ success: true, data: bookings });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const bookings = await Bookings.create(req.body);
        res.status(201).json({ success: true, data: bookings });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
