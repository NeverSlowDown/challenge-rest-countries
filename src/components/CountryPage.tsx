import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "../icons/ArrowLeft";
import { Container } from "./HomePage";

const CountrySection = styled.section`
  background: ${({ theme }) => theme.background};
  height: 100%;
  transition: 0.5s ease background;
`;

const BackContainer = styled.div`
  display: flex;
  margin: 32px 0;
`;

const LinkButton = styled(Link)`
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.mainText};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 8px 28px;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1em;
  transition: 0.3s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadowHover};
    opacity: 0.7;
  }
  text-decoration: none;
  text-align: center;
`;

const GoBack = styled.button`
  background: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.mainText};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 12px 32px;
  border: none;
  display: grid;
  align-items: center;
  gap: 0 12px;
  grid-template-columns: max-content max-content;
  cursor: pointer;
  font-size: 1em;
  svg {
    width: 18px;
  }
  transition: 0.3s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadowHover};
    opacity: 0.7;
  }
`;

const CountryDetails = styled.article`
  display: grid;
  align-items: center;
  grid-template-columns: minmax(540px, 1fr) minmax(300px, 1fr);
  color: ${({ theme }) => theme.mainText};
  gap: 0 120px;
`;

const FlagContainer = styled.figure`
  max-height: 400px;
  display: flex;
`;

const Flag = styled.img`
  width: 100%;
  height: 100%;
`;

const Details = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0 32px;
`;

const CountryName = styled.h1`
  font-weight: 700;
  font-size: 1.75em;
  text-align: left;
  margin-bottom: 42px;
`;

const Information = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px 0;
`;

const Column = styled.li`
  flex: 1 1 300px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px 0;
`;

const InformationItem = styled.p`
  display: grid;
  align-items: center;
  gap: 0 4px;
  grid-template-columns: max-content max-content;
`;

const ItemTitle = styled.span`
  color: ${({ theme }) => theme.mainText};
  font-weight: 600;
`;

const ItemDescription = styled.span`
  color: ${({ theme }) => theme.descriptionText};
`;

const Borders = styled(InformationItem).attrs({
  as: "div",
})`
  margin-top: 64px;
`;

const BorderContainer = styled.div`
  gap: 0 8px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-left: 8px;
`;

interface CountryInfo {
  name: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  flags: {
    svg: string;
    png: string;
  };
  tld: string[];
  currencies: string[];
  languages: string[];
  borders?: string[];
}

interface BorderCountry {
  altSpellings: string[];
  name: { common: string };
  cca2: string;
}

export default function CountryPage() {
  const [data, setData] = useState<CountryInfo | undefined>();
  const [borderData, setBorderData] = useState<BorderCountry[] | []>([]);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();

  useEffect(() => {
    const getCountryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${name}`
        );
        const data = await response.json();

        const result = data.map(
          ({
            name,
            population,
            region,
            subregion,
            capital,
            flags,
            tld,
            currencies,
            languages,
            borders,
          }: any) => {
            // in some cases a country could have multiple currencies, let's convert them into an array. (currently they come as objects)
            const listOfCurrencies = Object.keys(currencies).map((currency) => {
              return currencies[currency].name;
            });
            // let's transform languages into an array of strings
            const listOfLanguages = Object.keys(languages).map((lang) => {
              return languages[lang];
            });

            const countryName = name.common;

            const formated = {
              name: countryName,
              population,
              region,
              subregion,
              capital,
              flags,
              tld,
              currencies: listOfCurrencies,
              languages: listOfLanguages,
              borders,
            };
            return formated;
          }
        );

        // let's extract all the borders cca2 code and join them into a single string to use as a param for the API

        // I can't do this because it will take all the information from the countries (currently API V3 doesn't allow me to send param fields with param codes...) and I only need cca2 and name, so let's send 3 different api calls
        // const borderCodes = result[0].borders.join(",");
        // console.log({borderCodes})
        // const borderResponse = await fetch(
        //   `https://restcountries.com/v3.1/alpha?codes=${borderCodes}`
        // );
        // const borderData = await borderResponse.json();

        setData(result[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCountryData();
  }, [name]);

  useEffect(() => {
    const getBorderCountriesData = () =>
      data !== undefined &&
      data.borders !== undefined &&
      Promise.all(
        data.borders.map(async (border: string) => {
          const borderResponse = await fetch(
            `https://restcountries.com/v3.1/alpha/${border}?fields=name,cca2`
          );
          const borderData = await borderResponse.json();
          return borderData;
        })
      )
        .then((values: BorderCountry[]) => {
          setBorderData(values);
        })
        .catch((e) => console.log(e));

    getBorderCountriesData();
  }, [data]);

  const navigate = useNavigate();
  return (
    <CountrySection>
      <Container>
        <BackContainer>
          <GoBack onClick={() => navigate(-1)}>
            <ArrowLeft /> Back
          </GoBack>
        </BackContainer>
        {loading ? (
          <div>loading...</div>
        ) : data !== undefined ? (
          <CountryDetails>
            <FlagContainer>
              <Flag src={data["flags"]["svg"]} />
            </FlagContainer>
            <Details>
              <CountryName>{data["name"]}</CountryName>
              <Information>
                <Column>
                  <InformationItem>
                    <ItemTitle>Population:</ItemTitle>
                    <ItemDescription>
                      {data["population"].toLocaleString()}
                    </ItemDescription>
                  </InformationItem>
                  <InformationItem>
                    <ItemTitle>Region:</ItemTitle>
                    <ItemDescription>{data["region"]}</ItemDescription>
                  </InformationItem>
                  <InformationItem>
                    <ItemTitle>Sub Region:</ItemTitle>
                    <ItemDescription>{data["subregion"]}</ItemDescription>
                  </InformationItem>
                  <InformationItem>
                    <ItemTitle>Capital:</ItemTitle>
                    <ItemDescription>{data["capital"]}</ItemDescription>
                  </InformationItem>
                </Column>
                <Column>
                  <InformationItem>
                    <ItemTitle>Top Level Domain:</ItemTitle>
                    <ItemDescription>
                      {data["tld"].map((domain: string) => (
                        <span key={domain}>{domain}</span>
                      ))}
                    </ItemDescription>
                  </InformationItem>
                  <InformationItem>
                    <ItemTitle>Currencies:</ItemTitle>
                    <ItemDescription>
                      {data["currencies"].map((currency: string) => (
                        <span key={currency}>{currency}</span>
                      ))}
                    </ItemDescription>
                  </InformationItem>
                  <InformationItem>
                    <ItemTitle>Languages:</ItemTitle>
                    <ItemDescription>
                      {data["languages"].map((language: string) => (
                        <span key={language}>{language}</span>
                      ))}
                    </ItemDescription>
                  </InformationItem>
                </Column>
                {borderData.length > 0 && (
                  <Borders>
                    <InformationItem>
                      <ItemTitle>Border Countries:</ItemTitle>
                      <BorderContainer>
                        {borderData.map((border: BorderCountry) => (
                          <LinkButton to={`/${border.cca2}`} key={border.cca2}>
                            {border.name.common}
                          </LinkButton>
                        ))}
                      </BorderContainer>
                    </InformationItem>
                  </Borders>
                )}
              </Information>
            </Details>
          </CountryDetails>
        ) : (
          <div>error</div>
        )}
      </Container>
    </CountrySection>
  );
}
