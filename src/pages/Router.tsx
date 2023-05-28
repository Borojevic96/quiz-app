import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./Home/Home.tsx";
import QuizView from "./QuizView";
import NoRoute from "./NoRoute.tsx";

const RouterManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoRoute />} />
          <Route path="/quiz/:id/view" element={<QuizView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterManager;
