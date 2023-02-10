import styled from "styled-components";
import { theme } from "../App";
import { Moon } from '../icons/Moon';
import { Sun } from "../icons/Sun";

const Navbar = styled.nav`
  background: ${({ theme }) => theme.main};
  padding: 16px 0;
  min-height: 64px;
  width: 100%;
  transition: 0.5s ease background;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  padding: 0 20px;
  margin: 0 auto;
`;

const ThemeSwitcher = styled.button`
  color: ${({ theme }) => theme.mainText};
  font-size: 1em;
  display: grid;
  align-items: center;
  grid-template-columns: max-content max-content;
  transition: 0.5s ease;
  transition: 0.5s ease color;
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  padding-left: 28px;
  position: relative;
  overflow: hidden;
  &:hover {
    opacity: 0.7
  }
`;

const MainTitle = styled.a`
  color: ${({ theme }) => theme.mainText};
  font-size: 1.5em;
  transition: 0.5s ease;
  text-decoration: none;
  font-weight: 800;
  &:hover {
    opacity: 0.7
  }
`;

interface ThemeSwitch {
  on: string
}

const IconContainer = styled.figure<ThemeSwitch>`
  color: ${({ theme }) => theme.mainText};
  width: 24px;
  position: absolute;
  left: 0;
  transform: ${ ({on}) => on === "on" ? 'translateY(0px)': 'translateY(-24px)'} ;
  transition: 0.3s ease;
  svg {
    transition: 0.5s ease;
  }
`


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
        <MainTitle href="/">Where in the world?</MainTitle>
        <ThemeSwitcher onClick={handleTheme}>
          <IconContainer on={currentTheme.name === "light" ? "on" : "off"}>
            <Moon />
          </IconContainer>
          <IconContainer on={currentTheme.name === "dark" ? "on" : "off"}>
            <Sun />
          </IconContainer>
          <span>{currentTheme.name === "dark" ? 'Light' : 'Dark'} Mode</span>
        </ThemeSwitcher>
      </Container>
    </Navbar>
  );
}
