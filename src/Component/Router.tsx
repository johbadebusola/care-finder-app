import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import Home from "./Home";
// import Login  from './Login'

import { Error404 } from "./Error404";
import Loader from "./loader";

const Login = lazy(() => import("./Login"));
const Search = lazy(() => import("./Search"));
const Signup = lazy(() => import("./Signup"));

export const Router = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </div>
  );
};
