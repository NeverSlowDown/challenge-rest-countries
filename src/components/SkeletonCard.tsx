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
`

const CountryItem = styled.li`
  background: ${({ theme }) => theme.main};
  max-width: 266px;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.boxShadow};
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
  width: 100%;
  animation: ${skeleton} 2s cubic-bezier(0.57, 0.58, 0, 1.72) infinite;
  border-radius: 8px 8px 0 0;
`;


const InformationItem = styled.p`
  display: grid;
  align-items: center;
  gap: 0 4px;
  grid-template-columns: max-content max-content;
  transition: 0.5s ease;
  min-width: 120px;
`;

const CountryName = styled.span`
  color: ${({ theme }) => theme.mainText};
  font-size: 1.25em;
  text-align: left;
  margin-bottom: 16px;
  font-weight: 800;
  transition: 0.5s ease;
  min-width: 60px;
  height: 20px;
  animation: ${skeleton} 2s cubic-bezier(0.57, 0.58, 0, 1.72) infinite;
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
  min-width: 100px;
  height: 20px;
  margin-left: 20px;
  animation: ${skeleton} 2s cubic-bezier(0.57, 0.58, 0, 1.72) infinite;
`;


export default function SkeletonCard() {
  return (
    <CountryItem>
        <FlagContainer>
        </FlagContainer>
        <CountryInformation>
          <CountryName></CountryName>
          <InformationItem>
            <ItemTitle>Population:</ItemTitle>
            <ItemDescription>
            </ItemDescription>
          </InformationItem>
          <InformationItem>
            <ItemTitle>Region:</ItemTitle>
            <ItemDescription></ItemDescription>
          </InformationItem>
          <InformationItem>
            <ItemTitle>Capital:</ItemTitle>
            <ItemDescription></ItemDescription>
          </InformationItem>
        </CountryInformation>
    </CountryItem>
  );
}
