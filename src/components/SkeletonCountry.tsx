import styled, { keyframes } from "styled-components";

const skeleton = keyframes`
  0% {
    background: #d0d0d0;
  }
  50% {
    background: #9f9f9f;
  }
  100% {
    background: #d0d0d0;
  }
`;

const CountryDetails = styled.article`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(540px, 1fr));
  @media screen and (max-width: 675px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  color: ${({ theme }) => theme.mainText};
  gap: 50px 120px;
`;

const FlagContainer = styled.figure`
  max-height: 400px;
  display: flex;
  max-width: 750px;
  width: 100%;
  height: 400px;
  animation: ${skeleton} 2s cubic-bezier(0.57, 0.58, 0, 1.72) infinite;
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
  width: 200px;
  height: 20px;
  animation: ${skeleton} 2s cubic-bezier(0.57, 0.58, 0, 1.72) infinite;
`;

const Information = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px 0;
  @media screen and (max-width: 675px) {
    gap: 64px 0;
  }
`;

const Column = styled.li`
  flex: 1 1 300px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px 0;
  @media screen and (max-width: 675px) {
    gap: 16px 0;
  }
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
  min-width: 100px;
  height: 20px;
  animation: ${skeleton} 2s cubic-bezier(0.57, 0.58, 0, 1.72) infinite;

`;

// const Borders = styled.div`
//   margin-top: 64px;
//   @media screen and (max-width: 675px) {
//     margin-top: 0px;
//     gap: 20px 8px;
//   }
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   gap: 12px 8px;
// `;

// const BorderContainer = styled.div`
//   gap: 12px 8px;
//   display: flex;
//   flex-wrap: wrap;
// `;

// interface CountryInfo {
//   name: string;
//   population: number;
//   region: string;
//   subregion: string;
//   capital: string;
//   flags: {
//     svg: string;
//     png: string;
//   };
//   tld: string[];
//   currencies: string[];
//   languages: string[];
//   borders?: string[];
// }

// interface BorderCountry {
//   altSpellings: string[];
//   name: { common: string };
//   cca2: string;
// }

export default function SkeletonCountry() {
  return (
    <CountryDetails>
      <FlagContainer></FlagContainer>
      <Details>
        <CountryName></CountryName>
        <Information>
          <Column>
            <InformationItem>
              <ItemTitle>Population:</ItemTitle>
              <ItemDescription></ItemDescription>
            </InformationItem>
            <InformationItem>
              <ItemTitle>Region:</ItemTitle>
              <ItemDescription></ItemDescription>
            </InformationItem>
            <InformationItem>
              <ItemTitle>Sub Region:</ItemTitle>
              <ItemDescription></ItemDescription>
            </InformationItem>
            <InformationItem>
              <ItemTitle>Capital:</ItemTitle>
              <ItemDescription></ItemDescription>
            </InformationItem>
          </Column>
          <Column>
            <InformationItem>
              <ItemTitle>Top Level Domain:</ItemTitle>
              <ItemDescription></ItemDescription>
            </InformationItem>
            <InformationItem>
              <ItemTitle>Currencies:</ItemTitle>
              <ItemDescription></ItemDescription>
            </InformationItem>
            <InformationItem>
              <ItemTitle>Languages:</ItemTitle>
              <ItemDescription></ItemDescription>
            </InformationItem>
          </Column>
        </Information>
      </Details>
    </CountryDetails>
  );
}
