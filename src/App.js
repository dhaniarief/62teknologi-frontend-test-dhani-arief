import { Route, Routes } from "react-router-dom";
import {
  ColorModeContext,
  useMode,
} from "./context/ThemeProvider/ThemeProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./components/NotFound/NotFound";
import AddBusiness from "./pages/AddBusiness/AddBusiness";
import BusinessDetail from "./pages/BusinessDetail/BusinessDetail";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="/addBusiness" element={<AddBusiness />} />
            <Route path="/detailBusiness/:id" element={<BusinessDetail />} />

            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
