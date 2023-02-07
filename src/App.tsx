import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import HomePage from "./components/homePage";
import Nav from "./components/Nav";
import styled from 'styled-components';
import { useState } from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomePage />
    ),
  },
  {
    path: '/:name',
    element: <div>nameeeee</div>,
  },
]);

export const theme = {
  light: {
    name: "light",
    background: "#fafafa",
    main: "#fffff",
    secondary: "red",
    borderRadius: "4px",
    mainText: "#2a2b2d",
    descriptionText: "#646464",
    boxShadow: "0px 4px 4px #efefef"
  },
  dark: {
    name: "dark",
    background: "#212d36",
    main: "#2b3743",
    secondary: "red",
    borderRadius: "4px",
    mainText: "#fbffff",
    descriptionText: "#dde7ef",
    boxShadow: "0px 4px 4px #efefef"
  },
};

const Main = styled.main`
  display: flex;                 
  flex-direction: column;      
  justify-content: space-between; 
  width: 100%;
  height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
  }
`


function App() {
  const initialTheme = localStorage.getItem("theme") !== null ? localStorage.getItem("theme") : "light"
  console.log({initialTheme})
  const [currentTheme, setCurrentTheme] = useState( initialTheme === "light" ? theme.light : theme.dark )
  return (
    <Main className="App">
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Nav currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Main>
  );
}

export default App;
