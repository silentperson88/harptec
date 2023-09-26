import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React routes
import appRoutes from "routes";

// Sessions
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Session from "utils/Sessions";

export default function App() {
  const [isLogedIn, setIsLogedIn] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // updating role based on token  and Setting page scroll to 0 when changing the route
  useEffect(() => {
    if (Session.userEmail) {
      setIsLogedIn(true);
      navigate(pathname);
    } else {
      setIsLogedIn(false);
      navigate("/authentication/sign-in");
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname, Session.userEmail]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(appRoutes)}
        <Route
          path="*"
          element={
            <Navigate to={(!isLogedIn && "/authentication/sign-in") || (isLogedIn && "/home")} />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}
