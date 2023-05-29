import { Outlet } from "react-router-dom";
import Header from "@components/Header";
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
