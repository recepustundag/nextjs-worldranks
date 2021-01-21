import Link from 'next/link'
import styles from './index.module.css';

import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useState } from 'react';

const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === 'desc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const Arrowsort = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === 'desc') {
    return (
      <span>
        <FaAngleDown />
      </span>
    );
  } else {
    return (
      <span>
        <FaAngleUp />
      </span>
    );
  }
};

const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  const orderedCountres = orderBy(countries, value, direction);
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
    <div className={styles.tableContainer}>
      <div className={styles.heading}>
        <button
          onClick={() => setValueAndDirection('name')}
          className={styles.textcenter}>
          Name <Arrowsort />
        </button>
        <button onClick={() => setValueAndDirection('population')}>
          Population <Arrowsort direction="desc" />
        </button>
        <button>Area</button>
        <button> Gini </button>
      </div>
      {orderedCountres.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.name}>
          <div className={styles.row} key={country.name}>
              <div className={styles.flex}>
                <img className={styles.flag} src={country.flag} width="50" alt="" />
                {country.name}
              </div>
            <div>{country.population}</div>
            <div>{country.population}</div>
            <div>{country.population}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountryTable;
