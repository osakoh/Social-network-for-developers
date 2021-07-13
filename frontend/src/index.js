import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components"; // style component
// imports all themes as theme
import * as theme from "./components/Theme/theme";
import AuthState from "./components/context/Auth/AuthState";
import ProfileState from "./components/context/Profile/ProfileState";
// import ErrorState from "./components/context/Error/ErrorState";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthState>
        <ProfileState>
          <App />
        </ProfileState>
      </AuthState>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
