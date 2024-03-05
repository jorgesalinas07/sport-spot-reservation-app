import { render, fireEvent } from "@testing-library/react";
import { SportSpotsAPIContext } from "../../../src/contexts/SearchContext";
import { ResultBar } from "../../../src/presentation/components/results/result";
import { court, courts } from "../../fixtures/courts";

describe("ResultBar Component", () => {
  it("should call setPriceSortOrder with the selected value when the select element changes", () => {
    const setPriceSortOrder = jest.fn();

    const { getByRole } = render(
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
          setPriceSortOrder,
          setSportFilters: jest.fn(),
          setSpotCourt: jest.fn(),
          setIsMyReservationOpen: jest.fn(),
        }}
      >
        <ResultBar />
      </SportSpotsAPIContext.Provider>
    );

    const selectElement = getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "Price_Low" } });

    expect(setPriceSortOrder).toHaveBeenCalledTimes(1);
    expect(setPriceSortOrder).toHaveBeenCalledWith("Price_Low");
  });

  it('should have a default value of "Default" when no option has been selected', () => {
    const { getByRole } = render(
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
          setSportFilters: jest.fn(),
          setSpotCourt: jest.fn(),
          setIsMyReservationOpen: jest.fn(),
        }}
      >
        <ResultBar />
      </SportSpotsAPIContext.Provider>
    );

    const selectElement = getByRole("combobox");
    expect(selectElement).toHaveValue("Default");
  });
});
