import { spotBooking } from "../../src/contexts/SearchContext";
import { court, reservations } from "./courts";

const spotBookingFixture: spotBooking = {
  reservations: reservations,
  court: court,
};

const spotBookingsFixture: spotBooking[] = [
  {
    reservations: reservations,
    court: court,
  },
  {
    reservations: reservations,
    court: {
      id: 2,
      sport: "Tennis",
      title: "Tennis Court 1",
      dimension: "20x40",
      image: "image_url",
      description: "Description",
      reservations: reservations,
      price_per_hour: 10,
    },
  },
];

export { spotBookingFixture, spotBookingsFixture };
