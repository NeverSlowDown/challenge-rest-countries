import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-dropdown-select";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "../icons/MagnifyingGlass";

const Section = styled.section`
  background: ${({ theme }) => theme.background};
  width: 100%;
  flex: 1;
  transition: 0.5s ease background;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  padding: 32px 20px;
  margin: 0 auto;
  gap: 12px 0;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchCountry = styled.input`
  display: flex;
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.mainText};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border: none;
  padding: 12px 20px;
  width: 100%;
  max-width: 500px;
  transition: 0.5s ease background;
  padding-left: 42px;
  transition: 0.3s ease;
  min-height: 56px;
  box-sizing: border-box;
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadowHover};
    outline: none;
    + button {
      transform: scale(1) rotate(0deg);
    }
  }
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
  grid-gap: 74px 18px;
  grid-template-columns: repeat(auto-fill ,minmax(266px, 266px));
  padding: 32px 0;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 874px) {
    grid-template-columns: repeat(auto-fill ,minmax(224px,1fr));
  }
`;

const CountryItem = styled.li`
  background: ${({ theme }) => theme.main};
  max-width: 266px;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.5s ease;
`;

const CountryContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 100%;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.mainText};
  overflow: hidden;
  transition: .3s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadowHover};
  }
`;

const CountryInformation = styled.article`
  display: grid;
  padding: 24px 24px 48px 24px;
  grid-template-columns: 1fr;
  gap: 8px 0;
  color: ${({ theme }) => theme.mainText};
`;

const FlagContainer = styled.figure`
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 164px;
  transition: 0.3s ease;
  ${CountryContainer}:hover & {
    filter: brightness(1.1);
  }
`;
const CountryFlag = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const InformationItem = styled.p`
  display: grid;
  align-items: center;
  gap: 0 4px;
  grid-template-columns: max-content max-content;
  transition: 0.5s ease;
`;

const CountryName = styled.span`
  color: ${({ theme }) => theme.mainText};
  font-size: 1.25em;
  text-align: left;
  margin-bottom: 16px;
  font-weight: 800;
  transition: 0.5s ease;
`;

const ItemTitle = styled.span`
  color: ${({ theme }) => theme.mainText};
  font-weight: 600;
  font-size: 0.875em;
  transition: 0.5s ease;
`;

const ItemDescription = styled.span`
  color: ${({ theme }) => theme.descriptionText};
  font-size: 0.875em;
  transition: 0.5s ease;
`;

const Search = styled.button`
  color: ${({ theme }) => theme.mainText};
  background: none;
  width: 28px;
  padding: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 12px;
  margin-top: 2px;
  transform: scale(0.8) rotate(4deg);
  transition: 0.3s ease;
`;

const FormSearch = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 462px;
`;

const options = [
  {
    value: "All",
    label: "All regions",
  },
  {
    value: "Africa",
    label: "Africa",
  },

  {
    value: "Americas",
    label: "Americas",
  },
  {
    value: "Asia",
    label: "Asia",
  },
  {
    value: "Europe",
    label: "Europe",
  },
  {
    value: "Oceania",
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
  cca2: string;
}

interface Continent {
  value: string;
  label: string;
}

export default function HomePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [allRegionCountries, setAllRegionCountries] = useState<Country[]>([]);
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [continent, setContinent] = useState<Continent[]>([
    { value: "All", label: "Filter by Region" },
  ]);

  async function getAllCountriesData() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca2"
      );
      const data = await response.json();

      // if there's a continent selected then filter countries
      if (continent[0].value !== "All") {
        const filtered = data.filter(
          (country: Country) => country.region === continent[0].value
        );
        setCountries(filtered);
      } else {
        setCountries(data);
      }
      // save all region countries
      setAllRegionCountries(data);
    } catch (err) {
      setCountries([]);
      return err;
    } finally {
      setLoading(false);
    }
  }

  async function getCountryByName() {
    if (countryName === "") {
      getAllCountriesData();
    } else {
      try {
        setLoading(true);
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fields=name,population,region,capital,flags,cca2`
        );
        const data = await response.json();

        // if there's a continent selected then filter countries
        if (continent[0].value !== "All") {
          const filtered = data.filter(
            (country: Country) => country.region === continent[0].value
          );
          setCountries(filtered);
        } else {
          setCountries(data);
        }
        // save all region countries
        setAllRegionCountries(data);
      } catch (err) {
        setCountries([]);
        return err;
      } finally {
        setLoading(false);
      }
    }
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getCountryByName();
  }

  function filterCountries() {
    if (continent[0].value === "All") {
      setCountries(allRegionCountries);
    } else {
      const filteredCountries = countries.filter(
        (country: Country) => country.region === continent[0].value
      );
      if (filteredCountries.length === 0) {
        const filteredAllRegionCountries = allRegionCountries.filter(
          (country: Country) => country.region === continent[0].value
        );
        setCountries(filteredAllRegionCountries);
      } else {
        setCountries(filteredCountries);
      }
    }
  }

  useEffect(() => {
    getAllCountriesData();
  }, []);

  useEffect(() => {
    filterCountries();
  }, [continent]);

  return (
    <Section>
      <Container>
        <SearchBar>
          <FormSearch onSubmit={(e) => handleSearch(e)}>
            <SearchCountry
              type="text"
              autoComplete="off"
              placeholder="Search for a country..."
              name="search"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
            />
            <Search type="submit">
              <MagnifyingGlass />
            </Search>
          </FormSearch>
          <Select
            className="filter-continent"
            values={continent}
            placeholder="Filter by Region"
            options={options}
            searchable={false}
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
                    <CountryContainer to={`/${country.cca2}`}>
                      <FlagContainer>
                        <CountryFlag
                          src={country.flags.svg}
                          alt={country.name.common}
                        />
                      </FlagContainer>
                      <CountryInformation>
                        <CountryName>{country.name.common}</CountryName>
                        <InformationItem>
                          <ItemTitle>Population:</ItemTitle>
                          <ItemDescription>
                            {country.population}
                          </ItemDescription>
                        </InformationItem>
                        <InformationItem>
                          <ItemTitle>Region:</ItemTitle>
                          <ItemDescription>{country.region}</ItemDescription>
                        </InformationItem>
                        <InformationItem>
                          <ItemTitle>Capital:</ItemTitle>
                          <ItemDescription>{country.capital}</ItemDescription>
                        </InformationItem>
                      </CountryInformation>
                    </CountryContainer>
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
