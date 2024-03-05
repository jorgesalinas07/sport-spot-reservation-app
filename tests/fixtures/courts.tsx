import { Court, Reservation } from "../../src/domain/entities/sportSport";

const reservations: Reservation[] = [
  {
    id: 1,
    start_date: "2024-02-28T08:00:00",
    end_date: "2024-02-28T10:00:00",
  },
  {
    id: 2,
    start_date: "2024-02-28T11:00:00",
    end_date: "2024-02-28T13:00:00",
  },
];

const court: Court = {
  id: 1,
  sport: "Tennis",
  title: "Tennis Court 1",
  dimension: "20x40",
  image: "image_url",
  description: "Description",
  reservations: reservations,
  price_per_hour: 10,
};

const courts: Court[] = [
  {
    id: 1,
    sport: "Tennis",
    title: "Tennis Court 1",
    dimension: "20x40",
    image: "image_url",
    description: "Description",
    reservations: reservations,
    price_per_hour: 10,
  },
  {
    id: 2,
    sport: "Basketball",
    title: "Basketball Court 1",
    dimension: "30x50",
    image: "image_url",
    description: "Description",
    reservations: reservations,
    price_per_hour: 15,
  },
];

export { courts, court, reservations };
