import { Component } from "solid-js";
import ASCII404 from "../components/ASCII404";

const NotFound: Component = () => (
  <main class="flex flex-auto flex-col items-center justify-center gap-10 rounded border-4 border-green-300 p-6 text-sm md:text-base lg:gap-6 lg:text-lg">
    <div class="flex h-80 w-80 flex-col items-center justify-center bg-gray-900 p-6 text-center text-[0.45rem] leading-3 sm:h-[32rem] sm:w-[32rem] sm:text-[0.70rem] md:h-[42rem] md:w-[42rem] md:text-sm lg:h-[48rem] lg:w-[48rem] lg:text-base">
      <ASCII404 />
      <p class="mt-8 sm:mt-10 md:mt-12 lg:mt-14">PAGE NOT FOUND</p>
    </div>
    <a
      target="_blank"
      href="https://github.com/davmoba4/advent-of-code-2022-visualizer"
      class="group"
    >
      <img
        src="/src/assets/github-icon.svg"
        alt="GitHub"
        class="transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-hover:brightness-[1.2] group-hover:contrast-[1.01] group-hover:hue-rotate-[271deg] group-hover:invert group-hover:saturate-0 group-hover:sepia motion-reduce:transition-none motion-reduce:group-hover:transform-none"
      />
    </a>
  </main>
);

export default NotFound;
