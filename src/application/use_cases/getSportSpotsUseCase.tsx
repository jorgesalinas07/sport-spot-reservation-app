import { SportSpotRepository } from "../../domain/repositories/sportSpotRepository";

export class GetSportSpotsUseCase {
  private readonly sportSpotRepository: SportSpotRepository;

  public constructor(sportSpotRepository: SportSpotRepository) {
    this.sportSpotRepository = sportSpotRepository;
  }

  public async run() {
    return await this.sportSpotRepository.getSportSpots();
  }
}
