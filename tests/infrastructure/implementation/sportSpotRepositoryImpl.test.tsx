import { SportSpotRepositoryImpl } from "../../../src/infrastructure/implementation/sportSpotRepositoryImpl";
import { courts } from "../../fixtures/courts";

describe("Sport Spots API", () => {
  test("getSportSpot returns array of Courts successfully when called", async () => {
    const mockSuccessResponse = courts;

    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const sportSpotRepository = new SportSpotRepositoryImpl();
    const result = await sportSpotRepository.getSportSpots();

    expect(result).toEqual(mockSuccessResponse);
  });

  test("getSportSpot throws ApiRequestErrorException when there is an error in API request", async () => {
    const mockFetchPromise = Promise.reject(new Error("API request failed"));

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const sportSpotRepository = new SportSpotRepositoryImpl();

    await expect(sportSpotRepository.getSportSpots()).rejects.toThrowError(
      "Something went wrong in API request"
    );
  });
});
