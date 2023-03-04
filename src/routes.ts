import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/home")),
  },
  {
    path: "/day/09",
    component: lazy(() => import("./pages/day-09")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
