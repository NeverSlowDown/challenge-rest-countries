import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Container } from "./HomePage";

const CountrySection = styled.section`
  background: ${({ theme }) => theme.background};
  height: 100%;
`;

const BackContainer = styled.div`
  display: flex;
  margin: 64px 0;
`;

const BackButton = styled(Link)`
  background: ${({ theme }) => theme.mainColor};
  color: ${({ theme }) => theme.mainText};
`;

const CountryDetails = styled.article`
  display: grid;
  align-items: center;
  grid-template-columns: minmax(1fr, 540px) minmax(300px, 1fr);
  color: ${({ theme }) => theme.mainText};
`;

const FlagContainer = styled.figure`
  max-height: 400px;
  display: flex;
`;

const Flag = styled.img`
  width: 100%;
`;

const Details = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0 32px;
`;

const CountryName = styled.h1`
  font-weight: 700;
  font-size: 1.5em;
`;

const Information = styled.ul`
  display: flex;
  flex-wrap: wrap;
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
`;

const ItemDescription = styled.span`
  color: ${({ theme }) => theme.descriptionText};
`;

const Borders = styled(InformationItem)`
  margin-top: 32px;
`;

export default function CountryPage() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { name } = useParams();

  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        setLoading(true);
        const data = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const result = await data.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getSingleCountry();
  }, [name]);

  async function getCountryByName() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = await response.json();
      // TODO: attention with currencies, need to pick the first object as an array (look for countries with more than one currency)
      // TODO: languages must be treated as an array instead of an object languages: ara: "arabic"
      // TODO: borders are only codes: need to implement: https://restcountries.com/v3.1/alpha?codes={code},{code},{code}

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
          return {
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
          };
        }
      );
      setData(result);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  }
  return (
    <CountrySection>
      <Container>
        <BackContainer>
          <BackButton to="/">Back</BackButton>
        </BackContainer>
        <CountryDetails>
          <FlagContainer>
            <Flag />
          </FlagContainer>
          <Details>
            <CountryName>Country name</CountryName>
            <Information>
              <Column>
                <InformationItem>
                  <ItemTitle>Population:</ItemTitle>
                  <ItemDescription>______</ItemDescription>
                </InformationItem>
                <InformationItem>
                  <ItemTitle>Region:</ItemTitle>
                  <ItemDescription>______</ItemDescription>
                </InformationItem>
                <InformationItem>
                  <ItemTitle>Sub Region:</ItemTitle>
                  <ItemDescription>______</ItemDescription>
                </InformationItem>
                <InformationItem>
                  <ItemTitle>Capital:</ItemTitle>
                  <ItemDescription>______</ItemDescription>
                </InformationItem>
              </Column>
              <Column>
                <InformationItem>
                  <ItemTitle>Top Level Domain:</ItemTitle>
                  <ItemDescription>______</ItemDescription>
                </InformationItem>
                <InformationItem>
                  <ItemTitle>Currencies:</ItemTitle>
                  <ItemDescription>______</ItemDescription>
                </InformationItem>
              </Column>
              <Borders>
                <InformationItem>
                  <ItemTitle>Border Countries</ItemTitle>
                  <ItemDescription>______</ItemDescription>
                </InformationItem>
              </Borders>
            </Information>
          </Details>
        </CountryDetails>
      </Container>
    </CountrySection>
  );
}
