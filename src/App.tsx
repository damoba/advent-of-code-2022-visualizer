import type { Component } from "solid-js";
import { useRoutes } from "@solidjs/router";
import Header from "./components/Header";
import { routes } from "./routes";

const App: Component = () => {
  const Route = useRoutes(routes);
  return (
    <>
      <Header />
      <Route />
    </>
  );
};

export default App;
