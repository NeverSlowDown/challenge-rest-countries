import styled from "styled-components";
import { theme } from "../App";

const Navbar = styled.nav`
  background: ${({ theme }) => theme.main};
  padding: 8px 0;
  width: 100%;
  transition: 0.5s ease background;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const ThemeSwitcher = styled.button`
  color: ${({ theme }) => theme.mainText};
  font-size: 1.25em;
  display: grid;
  align-items: center;
  gap: 0 4px;
  grid-template-columns: 1fr 1fr;
  transition: 0.5s ease;
  transition: 0.5s ease color;
`;

const MainTitle = styled.h1`
  color: ${({ theme }) => theme.mainText};
  font-size: 1.5em;
  transition: 0.5s ease color;
`;

export default function Nav({ currentTheme, setCurrentTheme }: any) {
  function handleTheme() {
    const chosenTheme =
      currentTheme !== null && currentTheme.name === "light"
        ? theme.dark
        : theme.light;
    setCurrentTheme(chosenTheme);
    localStorage.setItem("theme", chosenTheme.name);
  }

  return (
    <Navbar>
      <Container>
        <MainTitle>Where in the world?</MainTitle>
        <ThemeSwitcher onClick={handleTheme}>
          moon icon
          <span>Dark Mode</span>
        </ThemeSwitcher>
      </Container>
    </Navbar>
  );
}
