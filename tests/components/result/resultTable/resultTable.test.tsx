import { fireEvent, render } from "@testing-library/react";
import {
  Detail,
  ResultTable,
  SpotCard,
} from "../../../../src/presentation/components/results/resultTable/resultTable";
import { court, courts, reservations } from "../../../fixtures/courts";
import { useContext } from "react";

describe("Detail Component", () => {
  it("should render with the provided props", () => {
    const props = court;

    const { getByText } = render(
      <Detail
        title={props.title}
        price={props.price_per_hour}
        description={props.description}
        dimension={props.dimension}
        reservation={reservations}
      />
    );

    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.description)).toBeInTheDocument();
    expect(getByText(`Dimension: ${props.dimension}`)).toBeInTheDocument();
    expect(
      getByText(`Price per hour: ${props.price_per_hour}`)
    ).toBeInTheDocument();
    expect(
      getByText(`Reservations: ${props.reservations.length}`)
    ).toBeInTheDocument();
  });
});

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("SpotCard Component", () => {
  it("should render with the provided court data", () => {
    const setIsModalOpen = jest.fn();
    const setSpotCourt = jest.fn();
    const isMyReservationOpen = false;

    (useContext as jest.Mock).mockReturnValue({
      setIsModalOpen,
      setSpotCourt,
      isMyReservationOpen,
    });

    const { getByText } = render(<SpotCard court={court} />);

    expect(getByText(court.title)).toBeInTheDocument();
    expect(getByText(court.description)).toBeInTheDocument();
    expect(
      getByText(`Price per hour: ${court.price_per_hour}`)
    ).toBeInTheDocument();
    expect(getByText(`Dimension: ${court.dimension}`)).toBeInTheDocument();
    expect(
      getByText(`Reservations: ${court.reservations.length}`)
    ).toBeInTheDocument();
    expect(getByText(court.title)).toBeInTheDocument();
  });

  it("should call setIsModalOpen and setSpotCourt when clicked", () => {
    const setIsModalOpen = jest.fn();
    const setSpotCourt = jest.fn();
    const isMyReservationOpen = false;

    (useContext as jest.Mock).mockReturnValue({
      setIsModalOpen,
      setSpotCourt,
      isMyReservationOpen,
    });

    const { getByTestId } = render(<SpotCard court={court} />);

    const spotCard = getByTestId("CardContainerTestId");
    fireEvent.click(spotCard);

    expect(setIsModalOpen).toHaveBeenCalledTimes(1);
    expect(setIsModalOpen).toHaveBeenCalledWith(true);
    expect(setSpotCourt).toHaveBeenCalledTimes(1);
    expect(setSpotCourt).toHaveBeenCalledWith(court);
  });
});

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("ResultTable Component", () => {
  it("should render with the provided context values", () => {
    const filteredSportCourts = courts;
    const isSpotLoading = false;
    const isModalOpen = false;
    const isMyReservationOpen = false;

    (useContext as jest.Mock).mockReturnValue({
      filteredSportCourts,
      isSpotLoading,
      isModalOpen,
      isMyReservationOpen,
    });

    const { getByText, queryByText, getByTestId } = render(<ResultTable />);

    expect(getByText("Results:")).toBeInTheDocument();
    expect(getByTestId("SportSpotsContainer")).toBeInTheDocument();
    expect(queryByText("loader")).not.toBeInTheDocument();

    filteredSportCourts.forEach((court) => {
      expect(getByText(court.title)).toBeInTheDocument();
      expect(
        getByText(`Price per hour: ${court.price_per_hour}`)
      ).toBeInTheDocument();
      expect(getByText(`Dimension: ${court.dimension}`)).toBeInTheDocument();
    });

    expect(queryByText("Modal")).not.toBeInTheDocument();
  });

  it("should apply custom style when isMyReservationOpen is true", () => {
    const isMyReservationOpen = true;

    (useContext as jest.Mock).mockReturnValue({
      filteredSportCourts: [],
      isSpotLoading: false,
      isModalOpen: false,
      isMyReservationOpen,
    });

    const { getByTestId } = render(<ResultTable />);

    const sportSpotsContainer = getByTestId("SportSpotsContainer");
    expect(sportSpotsContainer).toHaveClass("customStyle");
  });
});
