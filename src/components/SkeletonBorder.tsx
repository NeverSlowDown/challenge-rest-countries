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

const Borders = styled.div`
  margin-top: 64px;
  @media screen and (max-width: 675px) {
    margin-top: 0px;
    gap: 20px 8px;
  }
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 8px;
`;

const BorderContainer = styled.div`
  gap: 12px 8px;
  display: flex;
  flex-wrap: wrap;
`;

const ItemTitle = styled.span`
  color: ${({ theme }) => theme.mainText};
  font-weight: 600;
`;

const LinkButton = styled.div`
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
  min-width: 100px;
  height: 20px;
  animation: ${skeleton} 2s cubic-bezier(0.57, 0.58, 0, 1.72) infinite;
`;

export default function SkeletonCountry() {
  return (
    <Borders>
      <ItemTitle>Border Countries:</ItemTitle>
      <BorderContainer>
        <LinkButton></LinkButton>
      </BorderContainer>
    </Borders>
  );
}
