import { Route, Routes } from "react-router-dom";
import PaintPage from "./Paint/PaintPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PaintPage />} />
      <Route path="/paint" element={<PaintPage />} />
    </Routes>
  );
};

export default AppRouter;
