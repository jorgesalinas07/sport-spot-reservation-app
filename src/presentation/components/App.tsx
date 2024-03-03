import "./../styles/App.css";
import { SearchProvider } from "../../contexts/SearchContext";
import { Header } from "./layout/header";
import { ResultBar } from "./results/result";
import { Filter } from "./filter/filter";
import { ResultTable } from "./results/resultTable/resultTable";

function App() {
  return (
    <SearchProvider>
      <Header />
      <div className="GeneralContainer">
        <div className="ResultsContainer">
          <ResultBar />
          <div className="ResultAndFilterContainer">
            <Filter />
            <ResultTable />
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}

export default App;
