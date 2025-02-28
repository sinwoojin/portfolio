import HomePage from "@/Pages/HomePage";
import PaintApp from "@/Pages/PaintPage";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/paint" element={<PaintApp />} />
    </Routes>
  );
};

export default AppRouter;
