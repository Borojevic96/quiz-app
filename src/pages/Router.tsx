import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "@pages/Home";
import NoRoute from "@pages/NoRoute.tsx";
import QuizView from "@pages/QuizView";
import Layout from "@components/Layout";

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
