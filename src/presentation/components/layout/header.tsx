import { useContext } from "react";
import "../../styles/layout/header.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { SportSpotsAPIContext } from "../../../contexts/SearchContext";

function Header() {
  const { setIsMyReservationOpen } = useContext(SportSpotsAPIContext);

  const handleCalendarIconClick = () => {
    setIsMyReservationOpen(
      (prevIsMyReservationOpen) => !prevIsMyReservationOpen
    );
  };

  return (
    <div className="HeaderContainer">
      <Logo />
      <Search />
      <div className="CalendarIconContainer">
        <AiOutlineCalendar onClick={handleCalendarIconClick} />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="LogoContainer">
      <img src="src/assets/ioetLogo.png" />
      <h1>Ioet Sport Spot Reservation</h1>
    </div>
  );
}

function Search() {
  const { searchValue, setSearchValue } = useContext(SportSpotsAPIContext);

  return (
    <div className="SearchContainer">
      <input
        placeholder="Search..."
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
      <img src="src/assets/loupe.png" />
    </div>
  );
}

export { Header };
