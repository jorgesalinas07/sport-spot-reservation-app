import { useContext } from "react";
import {
  SportSpotsAPIContext,
  spotBooking,
} from "../../../contexts/SearchContext";
import { Button } from "antd";
import "../../styles/MyCalendar/MyCalendar.css";
import { AiOutlineCalendar, AiOutlineCloseCircle } from "react-icons/ai";
import { Reservation } from "../../../domain/entities/sportSport";
import dayjs from "dayjs";

function MyCalendar() {
  const { isMyReservationOpen, spotBookings, setIsMyReservationOpen } =
    useContext(SportSpotsAPIContext);

  if (!spotBookings.length) {
    setIsMyReservationOpen(false);
  }

  const myCalendarSubTotal = spotBookings.reduce(
    (subtotal, spotBooking) =>
      subtotal +
      spotBooking.court.price_per_hour *
        getReservationsHourQuantity(spotBooking.reservations),
    0
  );

  if (!isMyReservationOpen) return;
  return (
    <div className="MyCalendarContainer">
      <div className="MyCalendarSpotTotalDetails">
        <p>Subtotal</p>
        <strong>${myCalendarSubTotal}</strong>
        {/* TODO: Take button to the back when modal opened */}
        <Button type="primary">Proceed to payment</Button>
      </div>
      <div className="MyCalendarBookingsContainer">
        {spotBookings.map((spotBooking, index) => (
          <MyCalendarBookingDetails
            key={index}
            bookingIndex={index}
            spotBooking={spotBooking}
          />
        ))}
      </div>
    </div>
  );
}

function MyCalendarBookingDetails({
  spotBooking,
  bookingIndex,
}: {
  spotBooking: spotBooking;
  bookingIndex: number;
}) {
  const { setSpotBookings } = useContext(SportSpotsAPIContext);

  const handleRemoveFromMyReservations = () => {
    setSpotBookings((prevSpotBookings) =>
      prevSpotBookings.filter((_, index) => index !== bookingIndex)
    );
  };

  const bookingHourQuantity = getReservationsHourQuantity(
    spotBooking.reservations
  );

  return (
    <div className="MyReservationSpotDetailsContainer">
      <div className="MyReservationSpotImageContainer">
        <AiOutlineCloseCircle
          className="removeBooking"
          onClick={handleRemoveFromMyReservations}
        />
        <img src={spotBooking.court.image} />
      </div>
      <strong className="MyReservationSpotPrice">
        Price per hour: ${spotBooking.court.price_per_hour}
      </strong>
      <strong>Bookings: </strong>
      <div className="MyReservationBookings">
        {spotBooking.reservations.map((booking, index) => (
          <MyCalendarBookingReservationDetails
            key={index}
            reservation={booking}
          />
        ))}
      </div>
      <span> Hour/s: {bookingHourQuantity} </span>
    </div>
  );
}

function MyCalendarBookingReservationDetails({
  reservation,
}: {
  reservation: Reservation;
}) {
  const startDateString = dayjs(reservation.start_date)
    .toDate()
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  const endDateString = dayjs(reservation.end_date)
    .toDate()
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="MyReservationBookingsDates">
      <AiOutlineCalendar
        data-testid="MyReservationBookingsCalendarIcon"
        className="MyReservationBookingsCalendarIcon"
      />
      <div className="MyReservationBookingsDatesValues">
        <span>{dayjs(reservation.start_date).toDate().toDateString()}:</span>
        <span>
          {startDateString} to {endDateString}
        </span>
      </div>
    </div>
  );
}

function getReservationsHourQuantity(reservations: Reservation[]) {
  let totalHours = 0;
  reservations.forEach((reservation) => {
    const startDate = new Date(reservation.start_date);
    const endDate = new Date(reservation.end_date);
    const diffInHours =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

    totalHours += diffInHours;
  });

  return totalHours;
}

export {
  MyCalendar,
  getReservationsHourQuantity,
  MyCalendarBookingReservationDetails,
};
