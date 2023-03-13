import { Component } from "solid-js";
import ASCIIBanner from "../components/ASCIIBanner";
import githubIcon from "../assets/github-icon.svg";

const home: Component = () => (
  <main class="flex flex-auto flex-col items-center justify-center gap-10 rounded border-4 border-green-300 p-6 text-sm md:text-base lg:gap-6 lg:text-lg">
    <h1 class="text-center text-base font-bold md:text-lg lg:text-2xl">
      Advent of Code 2022 Visualizer
    </h1>
    <div class="flex h-80 w-80 flex-col items-center justify-center bg-gray-900 p-6 text-center text-[0.70rem] leading-3 sm:h-[32rem] sm:w-[32rem] md:h-[42rem] md:w-[42rem] md:text-sm lg:h-[48rem] lg:w-[48rem] lg:text-base">
      <ASCIIBanner />
      <p class="mt-2 sm:mt-4 md:mt-6 lg:mt-8">
        Welcome! Click on one of the days up on top for their corresponding
        visualization.
      </p>
    </div>
    <a
      target="_blank"
      href="https://github.com/davmoba4/advent-of-code-2022-visualizer"
      class="group"
    >
      <img
        src={githubIcon}
        alt="GitHub"
        class="transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-hover:brightness-[1.2] group-hover:contrast-[1.01] group-hover:hue-rotate-[271deg] group-hover:invert group-hover:saturate-0 group-hover:sepia motion-reduce:transition-none motion-reduce:group-hover:transform-none"
      />
    </a>
  </main>
);

export default home;
