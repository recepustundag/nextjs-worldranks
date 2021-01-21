import { useEffect, useState } from "react";
import Layout from '../../components/layouts/Layouts';
import styles from './country.module.css';

const getCountry = async (id) => {
  const resp = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = resp.json();
  return country;
}

const country = ({ country }) => {

  const [borders, setBorder] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(country.borders.map((border) => getCountry(border)));
    setBorder(borders);
  }

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <img
            src={country.flag}
            alt={country.name}
          />
          <h1>{country.name}</h1>
          <span className={styles.overview_continent}>{country.region}</span>
          <div className={styles.region}>
            <div>
              <strong>{country.population}</strong>
              <span>Population</span>
            </div>
            <div>
              <strong>{country.area}</strong>
              <span>Area(km)</span>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <h4>Details</h4>
          <div className={styles.details_panel}>
            <div>
              <span>Capital</span>
              <strong>{country.capital}</strong>
            </div>
            <div>
              <span>SubRegion</span>
              <strong>{country.subregion}</strong>
            </div>
            <div>
              <span>Languages</span>
              <strong>
                {country.languages.map((lang) => lang.name).join(', ')}
              </strong>
            </div>
            <div>
              <span>Currencies</span>
              <strong>{country.currencies.map((currency) => currency.name)}</strong>
            </div>
            <div>
              <span>Native Name</span>
              <strong>{country.nativeName}</strong>
            </div>
            <div>
              <span>Gini</span>
              <strong>{country.gini}</strong>
            </div>
          </div>
          <div className={styles.details_panel_footer}>
            <div>Neighbouring Countries</div>
            <div className={styles.country}>
            {borders.map(({ flag, name }) => (
              <div key={name}>
                <img
                  src={flag}
                  alt={name}
                />
                <span>{name}</span>
              </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default country;

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
