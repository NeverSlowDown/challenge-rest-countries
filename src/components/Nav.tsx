import styled from 'styled-components';

const Navbar = styled.nav`
  background: ${({theme}) => theme.main};
  padding: 8px 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const ThemeSwitcher = styled.button`
  color: ${({theme}) => theme.mainText};
  font-size: 1.25em;
  display: flex;
  align-items: center;
  gap: 0 4px;
`;

const MainTitle = styled.h1`
  color: ${({theme}) => theme.mainText};
  font-size: 1.5em;
`;

export default function Nav() {
  return (
    <Navbar>
      <Container>
        <MainTitle>
          Where in the world?
        </MainTitle>
        <ThemeSwitcher>
          moon icon
          <span>
            Dark Mode
          </span>
        </ThemeSwitcher>
      </Container>
    </Navbar>
  )
}
