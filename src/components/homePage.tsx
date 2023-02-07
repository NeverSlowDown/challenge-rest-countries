import { useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  background: ${({ theme }) => theme.background};
  width: 100%;
  flex: 1;
  transition: 0.5s ease background;
`;

const Container = styled.div`
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
  padding: 4px;
  width: 100%;
  max-width: 500px;
  transition: 0.5s ease background;
`;

const ContinentFilter = styled.select`
  display: flex;
  background: ${({ theme }) => theme.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 4px;
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

export default function HomePage() {
  const [countries, setCountries] = useState([]);

  return (
    <Section>
      <Container>
        <SearchBar>
          <SearchCountry
            type="text"
            autoComplete="off"
            placeholder="Search for a country..."
          />
          <ContinentFilter>
            <option>Africa</option>
            <option>America</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Oceania</option>
          </ContinentFilter>
        </SearchBar>

        <Content>
          {countries ? (
            <CountryList>
              <li>hola</li>
              <li>hola</li>
              <li>hola</li>
              <li>hola</li>
              <li>hola</li>
              <li>hola</li>
              <li>hola</li>
            </CountryList>
          ) : (
            <NotFound>Not found</NotFound>
          )}
        </Content>
      </Container>
    </Section>
  );
}
