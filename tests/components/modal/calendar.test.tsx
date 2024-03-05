import {
  appendReservationsToExistingSpotBooking,
  applyNewEventColor,
  getNewCalendarEvent,
  getSpotBookingEvents,
  getSpotBookingsUpdate,
  getSpotReservationEvents,
  isEventStartInFuture,
} from "../../../src/presentation/components/modal/calendar";
import { court, reservations } from "../../fixtures/courts";
import dayjs from "dayjs";
import {
  spotBookingFixture,
  spotBookingsFixture,
} from "../../fixtures/spotBookings";
import { render } from "@testing-library/react";
import { spotBooking } from "../../../src/contexts/SearchContext";
import { Court } from "../../../src/domain/entities/sportSport";


describe("getSpotReservationEvents Function", () => {
  it("getSpotReservationEvents should return an array of events with correct properties", () => {
    const sportCourt = court;
    const events = getSpotReservationEvents(sportCourt);

    expect(Array.isArray(events)).toBe(true);
    events.forEach((event) => {
      expect(event).toHaveProperty("start");
      expect(event).toHaveProperty("end");
      expect(event).toHaveProperty("title", "Rsved");
      expect(event).toHaveProperty("isNewBook", false);
    });

    events.forEach((event) => {
      expect(event.start).toBeInstanceOf(Date);
      expect(event.end).toBeInstanceOf(Date);
    });

    expect(events[0].start).toEqual(dayjs("2024-02-28T08:00:00").toDate());
    expect(events[0].end).toEqual(dayjs("2024-02-28T10:00:00").toDate());
    expect(events[1].start).toEqual(dayjs("2024-02-28T11:00:00").toDate());
    expect(events[1].end).toEqual(dayjs("2024-02-28T13:00:00").toDate());
  });

  it("should return an empty array when there are no reservations", () => {
    const sportCourt = {
      id: 1,
      sport: "Tennis",
      title: "Tennis Court 1",
      dimension: "20x40",
      image: "image_url",
      description: "Description",
      reservations: [],
      price_per_hour: 10,
    };

    const events = getSpotReservationEvents(sportCourt);

    expect(events).toEqual([]);
  });
});

describe("getSpotBookingEvents Function", () => {
  it("should return an array of events with correct properties for matching spot bookings", () => {
    const spotBookings = spotBookingsFixture;
    const sportCourt = court;
    const events = getSpotBookingEvents(spotBookings, sportCourt);

    expect(Array.isArray(events)).toBe(true);

    events.forEach((event) => {
      expect(event).toHaveProperty("start");
      expect(event).toHaveProperty("end");
      expect(event).toHaveProperty("title", "Rsved");
      expect(event).toHaveProperty("isNewBook", true);
    });

    events.forEach((event) => {
      expect(event.start).toBeInstanceOf(Date);
      expect(event.end).toBeInstanceOf(Date);
    });

    expect(events[0].start).toEqual(dayjs("2024-02-28T08:00:00").toDate());
    expect(events[0].end).toEqual(dayjs("2024-02-28T10:00:00").toDate());
    expect(events[1].start).toEqual(dayjs("2024-02-28T11:00:00").toDate());
    expect(events[1].end).toEqual(dayjs("2024-02-28T13:00:00").toDate());
  });

  it("should return an empty array when there are no matching spot bookings", () => {
    const spotBookings = spotBookingsFixture;
    const sportCourt = {
      id: 3,
      sport: "Tennis",
      title: "Tennis Court 1",
      dimension: "20x40",
      image: "image_url",
      description: "Description",
      reservations: reservations,
      price_per_hour: 10,
    };

    const events = getSpotBookingEvents(spotBookings, sportCourt);
    expect(events).toEqual([]);
  });
});

describe("isEventStartInFuture Function", () => {
  it("should return true if the event start is at least 2 hours in the future", () => {
    const start = new Date(Date.now() + 3 * 60 * 60 * 1000);
    const result = isEventStartInFuture(start);
    expect(result).toBe(true);
  });

  it("should return false if the event start is less than 2 hours in the future", () => {
    const start = new Date(Date.now() + 1 * 60 * 60 * 1000);
    const result = isEventStartInFuture(start);
    expect(result).toBe(false);
  });
});

describe("getNewCalendarEvent Function", () => {
  it("should return a new CalendarEvent with correct properties", () => {
    const start = new Date("2024-03-05T08:00:00");
    const end = new Date("2024-03-05T09:00:00");
    const event = getNewCalendarEvent(start, end);

    expect(event).toEqual({
      title: "Rsved",
      start: dayjs("2024-03-05T08:00:00").startOf("hour").toDate(),
      end: dayjs("2024-03-05T09:00:00").startOf("hour").add(1, "hour").toDate(),
      isNewBook: true,
    });
  });
});

describe("applyNewEventColor Function", () => {
  it("should apply the correct color when isNewBook is true", () => {
    const event = { title: "Test Event", isNewBook: true };
    const { getByText } = render(applyNewEventColor({ event }));
    const renderedComponent = getByText("Test Event");
    expect(renderedComponent).toHaveStyle("background-color: #f21d05");
  });

  it("should apply the correct color when isNewBook is false", () => {
    const event = { title: "Test Event", isNewBook: false };
    const { getByText } = render(applyNewEventColor({ event }));
    const renderedComponent = getByText("Test Event");
    expect(renderedComponent).toHaveStyle("background-color: #3174ad");
  });
});

describe("getSpotBookingsUpdate Function", () => {
  it("should add new spot booking when court is not already booked", () => {
    const spotBookings: spotBooking[] = [];
    const sportCourt = court;
    const calendarEvent = [
      {
        start: new Date("2024-03-05T08:00:00"),
        end: new Date("2024-03-05T09:00:00"),
        title: "Rsved",
        isNewBook: true,
      },
    ];

    const updatedSpotBookings = getSpotBookingsUpdate(
      spotBookings,
      sportCourt,
      calendarEvent
    );

    expect(updatedSpotBookings).toEqual([
      {
        court: sportCourt,
        reservations: calendarEvent.map((event) => ({
          id: 1,
          start_date: event.start.toISOString(),
          end_date: event.end.toISOString(),
        })),
      },
    ]);
  });

  it("should update existing spot booking when court is already booked", () => {
    const spotBookings = [spotBookingFixture];
    const sportCourt = court;
    const calendarEvent = [
      {
        start: new Date("2024-03-05T10:00:00"),
        end: new Date("2024-03-05T11:00:00"),
        title: "Rsved",
        isNewBook: true,
      },
    ];

    const updatedSpotBookings = getSpotBookingsUpdate(
      spotBookings,
      sportCourt,
      calendarEvent
    );

    expect(updatedSpotBookings).toEqual([
      {
        court: sportCourt,
        reservations: [
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
          {
            id: 1,
            start_date: "2024-03-05T15:00:00.000Z",
            end_date: "2024-03-05T16:00:00.000Z",
          },
        ],
      },
    ]);
  });
});

describe("getSpotBookingsWithExistingCourt Function", () => {
  it("should update spot bookings with existing court", () => {
    const spotBookings = [spotBookingFixture];
    const sportCourt = court;
    const reservations = [
      {
        id: 1,
        start_date: "2024-03-05T10:00:00",
        end_date: "2024-03-05T11:00:00",
      },
    ];
    const updatedSpotBookings = appendReservationsToExistingSpotBooking(
      spotBookings,
      sportCourt,
      reservations
    );

    expect(updatedSpotBookings).toEqual([
      {
        court: sportCourt,
        reservations: [
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
          {
            id: 1,
            start_date: "2024-03-05T10:00:00",
            end_date: "2024-03-05T11:00:00",
          },
        ],
      },
    ]);
  });

  it("should return spot bookings without changes when court does not match", () => {
    // Define some test data with a different court
    const spotBookings = spotBookingsFixture;
    const sportCourt: Court = {
      id: 3,
      sport: "Tennis",
      title: "Tennis Court 1",
      dimension: "20x40",
      image: "image_url",
      description: "Description",
      reservations: [],
      price_per_hour: 10,
    };
    const reservations = [
      {
        id: 1,
        start_date: "2024-03-05T10:00:00",
        end_date: "2024-03-05T11:00:00",
      },
    ];
    const updatedSpotBookings = appendReservationsToExistingSpotBooking(
      spotBookings,
      sportCourt,
      reservations
    );
    expect(updatedSpotBookings).toEqual(spotBookings);
  });
});
