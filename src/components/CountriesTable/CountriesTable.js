import {
  KeyboardArrowDownRounded,
  KeyboardArrowUp,
  Sort,
} from "@material-ui/icons";
import Styles from "./CountriesTable.module.css";
import { useState } from "react";
import Link from "next/link";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) =>
      a[value] > b[value] ? 1 : -1
    );
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) =>
      a[value] > b[value] ? -1 : 1
    );
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={Styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={Styles.heading_arrow}>
        <KeyboardArrowUp color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
      if (!direction) {
          setDirection('desc');
      } else if (direction === 'desc') {
          setDirection('asc');
      } else {
          setDirection(null);
      }
  };

  const setValueAndDirection = (value) => {
      switchDirection();
      setValue(value);
  };

  return (
    <div>
      <div className={Styles.heading}>

      <div className={Styles.heading_flag}>

      </div>
        <button className={Styles.heading_name}
        onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>

          <SortArrow />
        </button>

        <button className={Styles.heading_population} 
        onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>

          {value==="population" && <SortArrow direction={direction} />}
        </button>

        <button className={Styles.heading_area} 
        onClick={() => setValueAndDirection("area")}
        >
          <div>Area (Km<sup style={{fontSize: "0.5rem"}}>2</sup>)
          </div>

          {value==="area" &&<SortArrow direction={direction} />}
        </button>

        <button className={Styles.heading_gini} 
        onClick={() => setValueAndDirection("gini")}
        >
          <div> Gini </div>

          {value==="gini" &&<SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
        <div className={Styles.row}>
           <div className={Styles.flag}>
               <img src={country.flag} alt={country.name}/>
           </div>
          <div className={Styles.name}>{country.name}</div>

          <div className={Styles.population}>{country.population}</div>

          <div className={Styles.area}>{country.area || 0}</div>

          <div className={Styles.gini}>{country.gini || 0} % </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
