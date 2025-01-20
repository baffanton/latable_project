import { Route, Routes } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import PopularList from "@pages/PopularList/ui/PopularList";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/popular" element={<PopularList />} />
  </Routes>
);

export { AppRouter };
