import { Route, Routes } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { lazy, Suspense } from "react";
import { Spin } from "@shared/ui/Spin";

const PopularList = lazy(() => import("@pages/PopularList/ui/PopularList"));

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route
      path="/popular"
      element={
        <Suspense fallback={<Spin fullscreen />}>
          <PopularList />
        </Suspense>
      }
    />
  </Routes>
);

export { AppRouter };
