import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-dropdown-select";

const Section = styled.section`
  background: ${({ theme }) => theme.background};
  width: 100%;
  flex: 1;
  transition: 0.5s ease background;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  gap: 12px 0;
  padding: 32px 0;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchCountry = styled.input`
  display: flex;
  background: ${({ theme }) => theme.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 12px 20px;
  width: 100%;
  max-width: 500px;
  transition: 0.5s ease background;
`;

const Content = styled.section`
  display: flex;
  justify-content: center;
`;

const NotFound = styled.section`
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

const CountryList = styled.ul`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  padding: 32px 0;
  width: 100%;
`;

const CountryItem = styled.li`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const CountryInformation = styled.article`
  display: flex;
  flex-direction: column;
  padding: 16px 8px;
  color: ${({ theme }) => theme.mainText};
`;

const FlagContainer = styled.figure`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
const CountryFlag = styled.img`
  width: 100%;
`;
const InformationItem = styled.p`
  display: grid;
  align-items: center;
  gap: 0 4px;
  grid-template-columns: max-content max-content;
`;

const CountryName = styled.span`
  color: ${({ theme }) => theme.mainText};
  font-size: 1.25em;
  text-align: left;
`;

const ItemTitle = styled.span`
  color: ${({ theme }) => theme.mainText};
`;

const ItemDescription = styled.span`
  color: ${({ theme }) => theme.descriptionText};
`;

const options = [
  {
    value: "africa",
    label: "Africa",
  },
  {
    value: "america",
    label: "America",
  },
  {
    value: "asia",
    label: "Asia",
  },
  {
    value: "europe",
    label: "Europe",
  },
  {
    value: "oceania",
    label: "Oceania",
  },
];

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string[];
  flags: {
    svg: string;
    png: string;
  };
}

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [continent, setContinent] = useState([
    { value: "", label: "Filter by Region" },
  ]);

  async function getAllCountriesData() {
    try {
      setLoading(true);
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const result = data.map(
        ({ name, population, region, capital, flags }: Country) => {
          return { name, population, region, capital, flags };
        }
      );
      setCountries(result);
    } catch (err) {
      setCountries([]);
      return err;
    } finally {
      setLoading(false);
    }

  }
  async function getAllCountriesByContinentData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${continent[0].value}`
      );
      const data = await response.json();
      const result = data.map(
        ({ name, population, region, capital, flags }: Country) => {
          return { name, population, region, capital, flags };
        }
      );
      setCountries(result);
    } catch (err) {
      setCountries([]);
      return err;
    } finally {
      setLoading(false);
    }
  }

  
  async function getCountryByName() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = await response.json();
      const result = data.map(
        ({ name, population, region, capital, flags }: Country) => {
          return { name, population, region, capital, flags };
        }
      );
      setCountries(result);
    } catch (err) {
      setCountries([]);
      return err;
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getCountryByName()
  }


  useEffect(() => {
    getAllCountriesData();
  }, []);

  useEffect(() => {
    if (continent[0].value !== "") {
      getAllCountriesByContinentData();
    }
  }, [continent]);

  return (
    <Section>
      <Container>
        <SearchBar>
          <form onSubmit={e => handleSearch(e)}>
            <button type="submit">
              lupa
            </button>
            <SearchCountry
              type="text"
              autoComplete="off"
              placeholder="Search for a country..."
              name="search"
              required
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
            />
          </form>
          <Select
            className="filter-continent"
            values={continent}
            placeholder="Filter by Region"
            options={options}
            onChange={(values) => setContinent(values)}
          />
        </SearchBar>

        <Content>
          {loading ? (
            <div>loading...</div>
          ) : countries && countries.length > 0 ? (
            <CountryList>
              {countries.map((country: Country, index) => {
                return (
                  <CountryItem key={`country-${index}`}>
                    <FlagContainer>
                      <CountryFlag
                        src={country.flags.svg}
                        alt={country.name.common}
                      />
                    </FlagContainer>
                    <CountryInformation>
                      <CountryName>{country.name.common}</CountryName>
                      <InformationItem>
                        <ItemTitle>Population</ItemTitle>
                        <ItemDescription>{country.population}</ItemDescription>
                      </InformationItem>
                      <InformationItem>
                        <ItemTitle>Region</ItemTitle>
                        <ItemDescription>{country.region}</ItemDescription>
                      </InformationItem>
                      <InformationItem>
                        <ItemTitle>Capital</ItemTitle>
                        <ItemDescription>{country.capital}</ItemDescription>
                      </InformationItem>
                    </CountryInformation>
                  </CountryItem>
                );
              })}
            </CountryList>
          ) : (
            <NotFound>Not found</NotFound>
          )}
        </Content>
      </Container>
    </Section>
  );
}
