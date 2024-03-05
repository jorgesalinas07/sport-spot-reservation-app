// @ts-nocheck
import { SportSpotRepositoryImpl } from "../../src/infrastructure/implementation/sportSpotRepositoryImpl";
import { GetSportSpotsUseCase } from "../../src/application/use_cases/getSportSpotsUseCase";

jest.mock("../../src/infrastructure/implementation/sportSpotRepositoryImpl");
const mockSportSpotRespositoryImpl = jest.mocked(SportSpotRepositoryImpl);

describe("Get Sport Spots use case", () => {
  it("Use case run function calls the get Sport Spots repository function when called", async () => {
    const getSportSpotsUseCase = new GetSportSpotsUseCase(
      new SportSpotRepositoryImpl()
    );

    await getSportSpotsUseCase.run();
    const mockRepositoryImplInstance =
      mockSportSpotRespositoryImpl.mock.instances[0];

    const mockGetSportSpots =
      mockRepositoryImplInstance.getSportSpots as jest.Mock;

    expect(mockGetSportSpots).toHaveBeenCalled();
  });
});
