import { BrowserRouter, Route, Routes, RouterProvider } from "react-router-dom";
import appRoutes, { AppRoute } from "./routes/appRoutes";
import Home from "./pages/homePage/homePage";
import { AppProvider } from "./context/appContext";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppProvider>
        <RouterProvider router={appRoutes} />
      </AppProvider>
    </div>
  );
};

export default App;
