import { Routes, Route, Navigate } from "react-router-dom";
import Page from "./pages/Page";
import  Admin from "./pages/Admin";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/pages/home" />} />
        <Route path="/pages/:pageName" element={<Page />} />
        <Route path="/pages/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
