import HomePage from "@/pages/HomePage";
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
