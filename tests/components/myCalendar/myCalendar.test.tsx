import { render, screen } from "@testing-library/react";
import { Reservation } from "../../../src/domain/entities/sportSport";
import { MyCalendarBookingReservationDetails, getReservationsHourQuantity } from "../../../src/presentation/components/MyCalendar/myCalendar";
import { reservations } from "../../fixtures/courts";

describe("getReservationsHourQuantity Function", () => {
  it("should return 0 when there are no reservations", () => {
    const reservations: Reservation[] = [];
    const totalHours = getReservationsHourQuantity(reservations);

    expect(totalHours).toBe(0);
  });

  it("should return the correct total duration in hours when there are reservations", () => {
    const reservationsInBookings: Reservation[] = reservations;
    const totalHours = getReservationsHourQuantity(reservationsInBookings);

    expect(totalHours).toBe(4);
  });
});

describe("MyCalendarBookingReservationDetails Component", () => {
  it("should render the reservation details with correct date and time format", () => {
    const reservation = {
      id: 1,
      start_date: "2024-03-05T08:00:00",
      end_date: "2024-03-05T09:00:00",
    };
    const { getByText } = render(
      <MyCalendarBookingReservationDetails reservation={reservation} />
    );
    const startDateString = "Tue Mar 05 2024:";
    const endDateString = "08:00 AM to 09:00 AM";

    expect(getByText(startDateString)).toBeInTheDocument();
    expect(getByText(endDateString)).toBeInTheDocument();
  });

  it("should render the calendar icon", () => {
    const reservation = {
      id: 1,
      start_date: "2024-03-05T08:00:00",
      end_date: "2024-03-05T09:00:00",
    };

    render(<MyCalendarBookingReservationDetails reservation={reservation} />);
    expect(
      screen.getByTestId("MyReservationBookingsCalendarIcon")
    ).toBeInTheDocument();
  });
});
