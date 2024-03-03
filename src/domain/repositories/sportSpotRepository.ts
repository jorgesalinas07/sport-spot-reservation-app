import { Court } from "../entities/sportSport";

export interface SportSpotRepository {
  getSportSpots(): Promise<Array<Court>>;
}
