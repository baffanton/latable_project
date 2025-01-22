import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "@shared/ui/Spin";

const PopularList = lazy(() => import("@pages/PopularList/ui/PopularList"));
const HomePage = lazy(() => import("@pages/HomePage/ui/HomePage"));

const AppRouter = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<Spin fullscreen />}>
          <HomePage />
        </Suspense>
      }
    />
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
