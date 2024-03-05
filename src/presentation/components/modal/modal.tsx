import "./../../styles/modal/modal.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CourtCalendar } from "./calendar";
import { CalendarProvider } from "../../../contexts/CalendarContext";
import { Court } from "../../../domain/entities/sportSport";
import { useContext } from "react";
import { SportSpotsAPIContext } from "../../../contexts/SearchContext";

function Modal() {
  const { sportCourt } = useContext(SportSpotsAPIContext);

  return (
    <div className="ModalContainer">
      <div className="ContentModalContainer">
        <CourtDetails sportCourt={sportCourt} />
        <CalendarProvider>
          <CourtCalendar />
        </CalendarProvider>
      </div>
    </div>
  );
}

function CourtDetails({ sportCourt }: { sportCourt: Court }) {
  return (
    <div className="CourtModalDetailsContainer">
      <div className="CourtModalDetailsImage">
        <img src={sportCourt.image} />
      </div>
      <div className="CourtModalDetails">
        <h3> {sportCourt.title} </h3>
        <h5> {sportCourt.description} </h5>
        <h5> Dimension: {sportCourt.dimension} </h5>
        <h5> Price per hour: {sportCourt.price_per_hour} </h5>
        <h5> Reservations: {sportCourt.reservations.length} </h5>
      </div>
    </div>
  );
}

export { Modal, CourtDetails };
