import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/pages/home">Home</NavLink>{" | "}
      <NavLink to="/pages/about">About</NavLink>{" | "}
      <NavLink to="/pages/contacts">Contacts</NavLink>{" | "}
      <NavLink to="/pages/divisions">Divisions</NavLink>{" | "}
      <NavLink to="/pages/admin">Admin</NavLink>
    </nav>
  );
};

export default Navigation;
