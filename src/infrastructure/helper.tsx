import { GetSportSpotsUseCase } from "../application/use_cases/getSportSpotsUseCase";
import { SportSpotRepositoryImpl } from "./implementation/sportSpotRepositoryImpl";

export async function getSportSpots() {
  const sportSpotRepository = new SportSpotRepositoryImpl();
  const getSportSpotsUseCase = new GetSportSpotsUseCase(sportSpotRepository);
  const sportSportList = await getSportSpotsUseCase.run();
  return sportSportList;
}
