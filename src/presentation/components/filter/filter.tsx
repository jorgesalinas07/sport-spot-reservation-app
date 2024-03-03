import { useContext } from "react";
import { SportSpotsAPIContext } from "../../../contexts/SearchContext";
import "./../../styles/filter/filter.css";
import { Sport } from "../../../domain/entities/sportSport";

interface Option {
  id: string;
  label: string;
}

function Filter() {
  return (
    <div className="FilterContainer">
      <div>
        <TypeFilter
          name="Sports"
          options={[
            { id: "Swimming", label: "Swimming" },
            { id: "Water Polo", label: "Water Polo" },
            { id: "Volleyball", label: "Volleyball" },
            { id: "Soccer", label: "Soccer" },
            { id: "Basketball", label: "Basketball" },
            { id: "Baseball", label: "Baseball" },
            { id: "Tennis", label: "Tennis" },
          ]}
        />
      </div>
    </div>
  );
}

function TypeFilter({ name, options }: { name: String; options: Option[] }) {
  const { setSportFilters, sportFilters } = useContext(SportSpotsAPIContext);

  const handleInputChange = (sportFilter: Sport) => {
    const isSportOptionChecked = sportFilters.includes(sportFilter);

    setSportFilters((checkedSportFilters) => {
      if (isSportOptionChecked) {
        return checkedSportFilters.filter(
          (checkedFilter) => checkedFilter !== sportFilter
        );
      }
      return [...checkedSportFilters, sportFilter];
    });
  };

  return (
    <div className="TypeFilterContainer">
      <h2>{name}: </h2>
      {options.map((option, id) => (
        <div key={id} className="CheckBox">
          <input
            type="checkbox"
            id={option.id}
            name={option.label}
            onChange={() => handleInputChange(option.id)}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}

export { Filter };
