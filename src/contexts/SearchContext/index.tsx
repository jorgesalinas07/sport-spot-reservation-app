import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { getSportSpots } from "../../infrastructure/helper";
import { Court, Reservation, Sport } from "../../domain/entities/sportSport";

interface spotBooking {
  reservations: Reservation[];
  court: Court;
}

const defaultCourt: Court = {
  id: 0,
  sport: "",
  title: "",
  dimension: "",
  image: "",
  description: "",
  reservations: [],
  price_per_hour: 0,
};

interface SportSpotsContextValue {
  filteredSportCourts: Court[];
  isSpotLoading: boolean;
  isModalOpen: boolean;
  searchValue: string;
  sportFilters: Sport[];
  sportCourt: Court;
  spotBookings: spotBooking[];
  isMyReservationOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSpotBookings: Dispatch<SetStateAction<spotBooking[]>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setPriceSortOrder: Dispatch<SetStateAction<string>>;
  setSportFilters: Dispatch<SetStateAction<Sport[]>>;
  setSpotCourt: Dispatch<SetStateAction<Court>>;
  setIsMyReservationOpen: Dispatch<SetStateAction<boolean>>;
}

const SportSpotsAPIContext = createContext<SportSpotsContextValue>({
  filteredSportCourts: [],
  isSpotLoading: false,
  isModalOpen: false,
  searchValue: "",
  sportFilters: [],
  sportCourt: defaultCourt,
  spotBookings: [],
  isMyReservationOpen: false,
  setIsModalOpen: () => {},
  setSpotBookings: () => {},
  setSearchValue: () => {},
  setPriceSortOrder: () => {},
  setSportFilters: () => {},
  setSpotCourt: () => {},
  setIsMyReservationOpen: () => {},
});

function SearchProvider({ children }: { children: ReactNode }) {
  const [sportCourts, setSportCourts] = useState<Court[]>([]);
  const [isSpotLoading, setIsSpotLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spotBookings, setSpotBookings] = useState<spotBooking[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [priceSortOrder, setPriceSortOrder] = useState("Default");
  const [sportFilters, setSportFilters] = useState<Sport[]>([]);
  const [sportCourt, setSpotCourt] = useState<Court>(defaultCourt);
  const [isMyReservationOpen, setIsMyReservationOpen] =
    useState<boolean>(false);

  var filteredSportCourts: Court[] = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sportSpotList = await getSportSpots();
        setSportCourts(sportSpotList);
        setIsSpotLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  filteredSportCourts = getFilteredSportCourts(
    sportCourts,
    sportFilters,
    searchValue,
    priceSortOrder
  );

  return (
    <SportSpotsAPIContext.Provider
      value={{
        filteredSportCourts,
        isSpotLoading,
        isModalOpen,
        searchValue,
        sportFilters,
        sportCourt,
        spotBookings,
        isMyReservationOpen,
        setIsModalOpen,
        setSpotBookings,
        setSearchValue,
        setPriceSortOrder,
        setSportFilters,
        setSpotCourt,
        setIsMyReservationOpen,
      }}
    >
      {children}
    </SportSpotsAPIContext.Provider>
  );
}

function getFilteredSportCourts(
  sportCourts: Court[],
  sportFilters: Sport[],
  searchValue: string,
  priceSortOrder: string
) {
  const spotsFilteredBySport = getSpotsFilteredBySport(
    sportCourts,
    sportFilters
  );
  const searchedCourts = getCourtsFilteredBySearch(
    searchValue,
    spotsFilteredBySport
  );
  const filteredCourts: Court[] = sortCourtsByPrice(
    searchedCourts,
    priceSortOrder
  );

  return filteredCourts;
}

function getSpotsFilteredBySport(sportCourts: Court[], sportFilters: Sport[]) {
  return sportCourts.filter(
    ({ sport }) =>
      sportFilters.length === 0 ||
      sportFilters.some((filter) => filter === sport)
  );
}

function getCourtsFilteredBySearch(searchValue: string, sportCourts: Court[]) {
  return sportCourts.filter((court) => {
    const courtName = court.title.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return courtName.includes(searchText);
  });
}

function sortCourtsByPrice(courts: Court[], priceSortOrder: string) {
  const compareFunction = (
    a: { price_per_hour: number },
    b: { price_per_hour: number }
  ) => {
    switch (priceSortOrder) {
      case "Price_High":
        return b.price_per_hour - a.price_per_hour;
      case "Price_Low":
        return a.price_per_hour - b.price_per_hour;
      default:
        return 0;
    }
  };
  courts.sort(compareFunction);

  return courts;
}

export { SportSpotsAPIContext, SearchProvider, type spotBooking };
