import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import HomePage from "./components/homePage";
import Nav from "./components/Nav";

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

const theme = {
  light: {
    background: "orange",
    main: "gray",
    secondary: "red",
    borderRadius: "4px",
    mainText: "black",
    descriptionText: "gray",
    boxShadow: "2px 0 4px black"
  },
  dark: {
    background: "#FFFFF",
    main: "gray",
    secondary: "red",
    borderRadius: "4px",
    mainText: "black",
    descriptionText: "gray",
    boxShadow: "2px 0 4px black"
  },
};

function App() {
  return (
    <main className="App">
      <ThemeProvider theme={theme.light}>
        <Nav />
        <RouterProvider router={router} />
      </ThemeProvider>
    </main>
  );
}

export default App;
