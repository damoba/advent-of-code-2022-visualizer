/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";

import { Router } from "@solidjs/router";
import App from "./App";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}

render(
  () => () =>
    (
      <div class="flex min-h-screen flex-col gap-1 bg-blue-900 font-hack text-gray-200 md:gap-2 lg:gap-4">
        <Router>
          <App />
        </Router>
      </div>
    ),
  root!
);
