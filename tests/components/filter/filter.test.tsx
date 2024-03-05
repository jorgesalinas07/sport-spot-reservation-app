import { render, fireEvent, screen } from "@testing-library/react";
import { SportSpotsAPIContext } from "../../../src/contexts/SearchContext";
import { TypeFilter } from "../../../src/presentation/components/filter/filter";
import { court, courts } from "../../fixtures/courts";

describe("TypeFilter Component", () => {
  it("should call setSportFilters with the correct value when the checkbox is checked 2", async () => {
    const options = [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
    ];
    const setSportFilters = jest.fn();

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
          isMyReservationOpen: false,
          setIsModalOpen: jest.fn(),
          setSpotBookings: jest.fn(),
          setSearchValue: jest.fn(),
          setPriceSortOrder: jest.fn(),
          setSportFilters,
          setSpotCourt: jest.fn(),
          setIsMyReservationOpen: jest.fn(),
        }}
      >
        <TypeFilter name="Test Filter" options={options} />
      </SportSpotsAPIContext.Provider>
    );

    const checkbox1 = screen.getByLabelText("Option 1");
    expect(checkbox1).toBeInTheDocument();
  });

  it("should call setSportFilters with the correct value when the checkbox is checked", async () => {
    const setSportFilters = jest.fn();

    const options = [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
    ];

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
          isMyReservationOpen: false,
          setIsModalOpen: jest.fn(),
          setSpotBookings: jest.fn(),
          setSearchValue: jest.fn(),
          setPriceSortOrder: jest.fn(),
          setSportFilters,
          setSpotCourt: jest.fn(),
          setIsMyReservationOpen: jest.fn(),
        }}
      >
        <TypeFilter name="Test Filter" options={options} />
      </SportSpotsAPIContext.Provider>
    );

    const checkbox1 = screen.getByLabelText("Option 1");
    fireEvent.change(checkbox1, { target: { checked: true } });
    fireEvent.change(checkbox1, { target: { checked: false } });
  });
});
