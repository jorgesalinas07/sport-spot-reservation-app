import { Court } from "../../domain/entities/sportSport";
import { SportSpotRepository } from "../../domain/repositories/sportSpotRepository";
import { ApiRequestErrorException } from "../../exceptions/apiRequestErrorException";

const API_URL =
  "https://raw.githubusercontent.com/jorgesalinas07/fake-API-for-reservation-app/main/db.json";

export class SportSpotRepositoryImpl implements SportSpotRepository {
  async getSportSpots(): Promise<Array<Court>> {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      throw new ApiRequestErrorException({
        message: "Something went wrong in API request",
        cause: error,
      });
    }
  }
}
