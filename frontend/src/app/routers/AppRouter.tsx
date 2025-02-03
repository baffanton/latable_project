import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "@shared/ui/Spin";

const PopularList = lazy(() => import("@pages/PopularList"));
const HomePage = lazy(() => import("@pages/HomePage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));
const RestaurantList = lazy(() => import("@pages/RestaurantList"));

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
    <Route
      path="/restaurant-list"
      element={
        <Suspense fallback={<Spin fullscreen size="large" />}>
          <RestaurantList />
        </Suspense>
      }
    />
    <Route
      path="*"
      element={
        <Suspense fallback={<Spin fullscreen />}>
          <NotFoundPage />
        </Suspense>
      }
    />
  </Routes>
);

export { AppRouter };
