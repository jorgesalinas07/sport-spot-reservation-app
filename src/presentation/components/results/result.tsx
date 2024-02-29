import { useContext } from "react";
import { SportSpotsAPIContext } from "../../../contexts/SearchContext";
import "./../../styles/result/result.css";

function ResultBar() {
  const { setPriceSortOrder } = useContext(SportSpotsAPIContext);

  return (
    <div className="ResultContainer">
      <select
        name="order"
        id="order"
        onChange={(event) => {
          setPriceSortOrder(event.target.value);
        }}
      >
        <option value="Default">Name</option>
        <option value="Price_Low">Price: Low to High</option>
        <option value="Price_High">Price: High to Low</option>
      </select>
    </div>
  );
}

export { ResultBar };
