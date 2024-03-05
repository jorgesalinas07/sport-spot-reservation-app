import { GetSportSpotsUseCase } from "../../src/application/use_cases/getSportSpotsUseCase";
import { getSportSpots } from "../../src/infrastructure/helper";
import { SportSpotRepositoryImpl } from "../../src/infrastructure/implementation/sportSpotRepositoryImpl";

jest.mock("../../src/infrastructure/implementation/sportSpotRepositoryImpl");
jest.mock("../../src/application/use_cases/getSportSpotsUseCase");
const mockUpdateGetSportSpotUseCase = jest.mocked(GetSportSpotsUseCase);

describe("getSportSpots helper", () => {
  it("test helper creates instances of repository and use case when triggered", async () => {
    await getSportSpots();

    const mockUpdateGetSportSpotInstance =
      mockUpdateGetSportSpotUseCase.mock.instances[0];
    const mockExecute = mockUpdateGetSportSpotInstance.run as jest.Mock;

    expect(SportSpotRepositoryImpl).toHaveBeenCalledTimes(1);
    expect(GetSportSpotsUseCase).toBeCalledTimes(1);
    expect(mockExecute).toHaveBeenCalled();
  });
});
