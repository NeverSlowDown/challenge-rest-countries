import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import HomePage from "./components/HomePage";
import Nav from "./components/Nav";
import styled from "styled-components";
import { useState } from "react";
import CountryPage from "./components/CountryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:name",
    element: <CountryPage />,
  },
]);

export const theme = {
  light: {
    name: "light",
    background: "hsl(0, 0%, 98%)",
    main: "#ffffff",
    secondary: "red",
    borderRadius: "8px",
    mainText: "hsl(200, 15%, 8%)",
    descriptionText: "hsl(0, 0%, 52%)",
    boxShadow: "0px 2px 8px #e3e3e3",
    boxShadowHover: "0px 8px 16px #e3e3e3",
  },
  dark: {
    name: "dark",
    background: "hsl(207, 26%, 17%)",
    main: "hsl(209, 23%, 22%)",
    secondary: "red",
    borderRadius: "8px",
    mainText: "hsl(0, 0%, 100%)",
    descriptionText: "hsl(0, 0%, 98%)",
    boxShadow: "0px 2px 8px #00000",
    boxShadowHover: "0px 8px 16px #00000",
  },
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

function App() {
  const initialTheme =
    localStorage.getItem("theme") !== null
      ? localStorage.getItem("theme")
      : "light";
  const [currentTheme, setCurrentTheme] = useState(
    initialTheme === "light" ? theme.light : theme.dark
  );

  const GlobalStyle = createGlobalStyle`
 
    html, body, #root {
      width: 100%;
      height: 100%;
    }
    body {
      font-family: 'Nunito Sans', sans-serif;
    }
    .filter-continent {
      color: ${currentTheme.mainText};
      transition: 0.5s ease;
      background: ${currentTheme.main};
      box-shadow: ${currentTheme.boxShadow};
      padding: 12px 20px !important;
      @media screen and (max-width: 675px) {
        max-width: fit-content;
      }
    }
    
    .filter-continent.react-dropdown-select {
      height: 100% ;
      min-height: 56px;
      border: none ;
      border-radius: ${currentTheme.borderRadius} ;
      box-shadow: ${currentTheme.boxShadow} ;
      transition: 0.3s ease;
      font-size: .875em ;
      &:hover {
        box-shadow: ${currentTheme.boxShadowHover} ;
      }
    }
    
    .filter-continent.react-dropdown-select .react-dropdown-select-item {
      padding: 8px 10px !important;
      border: none !important;
      &:hover {
        font-weight: 800;
        background: none;
      }
    }
    
    .filter-continent .react-dropdown-select-item-selected {
      background: none !important;
      color: ${currentTheme.mainText} !important;
      border-bottom: 1px solid #fff !important;
      font-weight: 800;
    }
    
    .react-dropdown-select-dropdown {
      color: ${currentTheme.mainText} !important;
      background: ${currentTheme.main} !important;
      border: none !important;
      border-radius: ${currentTheme.borderRadius} !important;
    }

  `;

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
