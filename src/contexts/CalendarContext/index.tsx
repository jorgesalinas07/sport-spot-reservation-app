import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  isNewBook: boolean;
}

interface CalendarContextValue {
  setCalendarEvent: Dispatch<SetStateAction<CalendarEvent[]>>;
  calendarEvent: CalendarEvent[];
}

const CalendarContext = createContext<CalendarContextValue>({
  setCalendarEvent: () => {},
  calendarEvent: [],
});

function CalendarProvider({ children }: { children: ReactNode }) {
  const [calendarEvent, setCalendarEvent] = useState<CalendarEvent[]>([]);
  return (
    <CalendarContext.Provider
      value={{
        calendarEvent,
        setCalendarEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export { CalendarContext, CalendarProvider, type CalendarEvent };
