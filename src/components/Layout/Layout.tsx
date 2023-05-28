import { Outlet } from "react-router-dom";
import Header from "../Header";
import "./layout.scss";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
