import { render } from "@testing-library/react";
import { CourtDetails } from "../../../src/presentation/components/modal/modal";
import { court } from "../../fixtures/courts";

describe("CourtDetails Component", () => {
  it("should render with the provided sportCourt data", () => {
    const sportCourt = court;

    const { getByText } = render(<CourtDetails sportCourt={sportCourt} />);

    expect(getByText(sportCourt.title)).toBeInTheDocument();
    expect(getByText(sportCourt.description)).toBeInTheDocument();
    expect(getByText(`Dimension: ${sportCourt.dimension}`)).toBeInTheDocument();
    expect(
      getByText(`Price per hour: ${sportCourt.price_per_hour}`)
    ).toBeInTheDocument();
    expect(
      getByText(`Reservations: ${sportCourt.reservations.length}`)
    ).toBeInTheDocument();
    expect(getByText(sportCourt.title)).toBeInTheDocument();
  });
});
