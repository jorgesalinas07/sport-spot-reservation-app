import { useContext } from "react";
import { SportSpotsAPIContext } from "../../../../contexts/SearchContext";
import { Reservation, Court } from "../../../../domain/entities/sportSport";
import "./../../../styles/result/resultTable.css";
import { Modal } from "../../modal/modal";

function ResultTable() {
  const {
    filteredSportCourts,
    isSpotLoading,
    isModalOpen,
  } = useContext(SportSpotsAPIContext);

  return (
    <div className="ResultTableContainer">
      <h2>Results:</h2>
      <div className="SportSpotsContainer">
        {isSpotLoading ? (
          <span className="loader"></span>
        ) : (
          filteredSportCourts.map((court, index) => (
            <SpotCard key={index} court={court} />
          ))
        )}
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
}

function SpotCard({ court }: { court: Court }) {
  const { setIsModalOpen, setSpotCourt } =
    useContext(SportSpotsAPIContext);

  const openModal = () => {
    setIsModalOpen(true);
    setSpotCourt(court);
  };
  return (
    <div
      className="CardContainer"
      onClick={openModal}
    >
      <div className="CardImageContainer">
        <img src={court.image} />
      </div>
      <Detail
        title={court.title}
        price={court.price_per_hour}
        description={court.description}
        dimension={court.dimension}
        reservation={court.reservations}
      />
    </div>
  );
}

function Detail({
  title,
  price,
  description,
  dimension,
  reservation,
}: {
  title: string;
  price: number;
  description: string;
  dimension: string;
  reservation: Reservation[];
}) {
  return (
    <div className="DetailsCardContainer">
      <h3>{title}</h3>
      <h5>{description}</h5>
      <h5>Dimension: {dimension}</h5>
      <h5>Price per hour: {price}</h5>
      <h5>Reservations: {reservation.length}</h5>
    </div>
  );
}

export { ResultTable };
