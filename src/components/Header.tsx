import { Component } from "solid-js";
import { Link } from "@solidjs/router";

const Header: Component = () => (
  <header>
    <nav>
      <ul class="flex flex-wrap justify-center gap-6 rounded border-4 border-green-300 p-6 text-sm md:text-base lg:text-lg">
        <li class="max-w-max">
          <Link
            href="/"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Home
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/05"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 05
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/06"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 06
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/08"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 08
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/09"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 09
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/10"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 10
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/12"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 12
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/13"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 13
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/14"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 14
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/17"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 17
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/22"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 22
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/23"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 23
          </Link>
        </li>
        <li class="max-w-max">
          <Link
            href="/day/24"
            class="text-green-400 underline decoration-green-300 hover:text-green-200"
          >
            Day 24
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
