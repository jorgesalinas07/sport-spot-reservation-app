import { Calendar, dayjsLocalizer } from "react-big-calendar";
import {SportSpotsAPIContext} from "../../../contexts/SearchContext";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { Button } from "antd";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Court } from "../../../domain/entities/sportSport";
import "../../styles/modal/calendar.css";

interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  isNewBook: boolean;
}

function CourtCalendar() {
  const {
    sportCourt,
    setIsModalOpen,
  } = useContext(SportSpotsAPIContext);


  const setCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="CalendarContainer">
      <div className="CalendarContentContainer">
        <CalendarRender sportCourt={sportCourt} />
        <AiOutlineCloseCircle className="closeModal" onClick={setCloseModal} />
      </div>
      <div className="AddToMyCalendarButtonContainer">
        <Button type="primary">
          Add to My Calendar
        </Button>
      </div>
    </div>
  );
}

function CalendarRender({ sportCourt }: { sportCourt: Court }) {

  const [calendarEvent, setCalendarEvent] = useState<CalendarEvent[]>([]);

  const handleSelectSlot = ({ start, end }: { start: any; end: any }) => {
    if (!isEventStartInFuture(start)) {
      return;
    }

    const newEvent = getNewCalendarEvent(start, end);
    setCalendarEvent((prevCalendarEvents) => [...prevCalendarEvents, newEvent]);
  };

  const handleEventColor = {
    event: (props: any) => {
      return applyNewEventColor(props);
    },
  };

  const spotReservationEvents: CalendarEvent[] =
    getSpotReservationEvents(sportCourt);

  var displayedEvents = calendarEvent.concat(spotReservationEvents);

  const localizer = dayjsLocalizer(dayjs);

  return (
    <Calendar
      localizer={localizer}
      style={{
        height: 400,
        width: 650,
      }}
      events={displayedEvents}
      views={["week", "day"]}
      defaultView="week"
      min={dayjs("2024-02-28T08:00:00").toDate()}
      max={dayjs("2024-02-28T23:00:00").toDate()}
      selectable={true}
      formats={{
        eventTimeRangeFormat: () => {
          return "";
        },
      }}
      onSelectSlot={handleSelectSlot}
      components={handleEventColor}
    />
  );
}

function getSpotReservationEvents(sportCourt: Court) {
  return sportCourt.reservations.map((reservation) => ({
    start: dayjs(reservation.start_date).toDate(),
    end: dayjs(reservation.end_date).toDate(),
    title: "Rsved",
    isNewBook: false,
  }));
}

function isEventStartInFuture(start: Date): boolean {
  const currentDate = new Date();
  const eventStartDiffMilliseconds = start.getTime() - currentDate.getTime();
  const eventStartDiffInHours = eventStartDiffMilliseconds / (1000 * 60 * 60);
  return eventStartDiffInHours >= 2;
}

function getNewCalendarEvent(start: Date, end: Date): CalendarEvent {
  start = dayjs(start).startOf("hour").toDate();
  end = dayjs(end).startOf("hour").add(1, "hour").toDate();
  return {
    title: "Rsved",
    start,
    end,
    isNewBook: true,
  };
}

function applyNewEventColor(props: any) {
  const color = props.event.isNewBook ? "#f21d05" : "#3174ad";

  return <div style={{ backgroundColor: color }}>{props.event.title}</div>;
}

export { CourtCalendar };
