import { render, screen, fireEvent } from "@testing-library/react";
import {
  Search,
  Logo,
  Header,
} from "../../../src/presentation/components/layout/header";
import { SportSpotsAPIContext } from "../../../src/contexts/SearchContext";
import { court, courts } from "../../fixtures/courts";

describe("Header component", () => {
  test("renders the header with the correct elements", () => {
    const { getByTestId } = render(<Header />);
    const calendarIconElement = getByTestId("HeaderCalendarIcon");

    expect(calendarIconElement).toBeInTheDocument();
  });

  test("clicking the calendar icon toggles the isMyReservationOpen state", () => {
    const setIsMyReservationOpen = jest.fn();
    const isMyReservationOpen = false;

    render(
      <SportSpotsAPIContext.Provider
        value={{
          filteredSportCourts: courts,
          isSpotLoading: false,
          isModalOpen: false,
          searchValue: "",
          sportFilters: [],
          sportCourt: court,
          spotBookings: [],
          isMyReservationOpen,
          setIsModalOpen: jest.fn(),
          setSpotBookings: jest.fn(),
          setSearchValue: jest.fn(),
          setPriceSortOrder: jest.fn(),
          setSportFilters: jest.fn(),
          setSpotCourt: jest.fn(),
          setIsMyReservationOpen,
        }}
      >
        <Header />
      </SportSpotsAPIContext.Provider>
    );

    const calendarIconElement = screen.getByTestId("HeaderCalendarIcon");

    fireEvent.click(calendarIconElement);

    expect(setIsMyReservationOpen).toHaveBeenCalledTimes(1);
  });

  test("Search should update search value on input change", () => {
    const setSearchValue = jest.fn();
    const searchValue = "initial value";

    render(
      <SportSpotsAPIContext.Provider
        value={{
          filteredSportCourts: courts,
          isSpotLoading: false,
          isModalOpen: false,
          searchValue,
          sportFilters: [],
          sportCourt: court,
          spotBookings: [],
          isMyReservationOpen: false,
          setIsModalOpen: jest.fn(),
          setSpotBookings: jest.fn(),
          setSearchValue,
          setPriceSortOrder: jest.fn(),
          setSportFilters: jest.fn(),
          setSpotCourt: jest.fn(),
          setIsMyReservationOpen: jest.fn(),
        }}
      >
        <Search />
      </SportSpotsAPIContext.Provider>
    );

    const inputElement = screen.getByPlaceholderText("Search...");

    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(setSearchValue).toHaveBeenCalledWith("new value");
  });

  it("Logo renders the logo and title", () => {
    const { getByText, getByRole } = render(<Logo />);
    const title = getByText("Ioet Sport Spot Reservation");
    const imgElement = getByRole("img");

    expect(title).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "src/assets/ioetLogo.png");
  });
});
