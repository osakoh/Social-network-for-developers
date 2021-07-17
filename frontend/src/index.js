import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components"; // style component
// imports all themes as theme
import * as theme from "./components/Theme/theme";
import AuthState from "./components/context/Auth/AuthState";
import ProfileState from "./components/context/Profile/ProfileState";
import GithubState from "./components/context/github/GithubState";
import PostState from "./components/context/post/PostState";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthState>
        <ProfileState>
          <GithubState>
            <PostState>
              <App />
            </PostState>
          </GithubState>
        </ProfileState>
      </AuthState>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
