export interface Court {
    id: number;
    sport: Sport;
    title: string;
    dimension: string;
    image: string;
    description: string;
    reservations: Reservation[];
    price_per_hour: number;
  }

  export interface Reservation {
    id: number;
    start_date: Date;
    end_date: Date;
  }

  export type Sport = string;
