import {
  Accessor,
  Component,
  createEffect,
  createResource,
  createSignal,
  Setter,
} from "solid-js";
import inputFile from "../inputs/day-09.txt";

const START = "START";
const STOP = "STOP";

type Knot = { r: number; c: number; str: string };

const MOVE_RIGHT = "R";
const MOVE_LEFT = "L";
const MOVE_UP = "U";
const MOVE_DOWN = "D";

const fetchInputText = async (file: string) => {
  const response = await fetch(file);
  return await response.text();
};

const calcMaxLen = (lines: string[]) => {
  return lines.reduce((acc, line) => {
    let max = acc;
    if (line !== "") {
      max = Math.max(acc, parseInt(line.split(" ")[1], 10));
    }
    return max;
  }, 0);
};

const parseMotion = (motion: string) => {
  return motion.split(" ").map((x, i) => {
    if (i === 1) {
      return parseInt(x, 10);
    } else {
      return x;
    }
  });
};

const move = (
  visitedPos: Set<string>,
  headPos: Accessor<Knot>,
  setHeadPos: Setter<Knot>,
  tailPos: Accessor<Knot>,
  setTailPos: Setter<Knot>,
  motion: string
) => {
  const [dir, dist]: [string, number] = parseMotion(motion) as [string, number];

  switch (dir) {
    case MOVE_RIGHT:
      for (let i = 0; i < dist; i++) {
        if (
          (tailPos().r < headPos().r && tailPos().c < headPos().c) ||
          (tailPos().r === headPos().r && tailPos().c < headPos().c) ||
          (tailPos().r > headPos().r && tailPos().c < headPos().c)
        ) {
          setTailPos({ ...headPos() });
          visitedPos.add(tailPos().str);
        }
        setHeadPos({
          ...headPos(),
          c: headPos().c + 1,
          str: [headPos().r, headPos().c + 1].toString(),
        });
      }
      break;
    case MOVE_LEFT:
      for (let i = 0; i < dist; i++) {
        if (
          (tailPos().r < headPos().r && tailPos().c > headPos().c) ||
          (tailPos().r === headPos().r && tailPos().c > headPos().c) ||
          (tailPos().r > headPos().r && tailPos().c > headPos().c)
        ) {
          setTailPos({ ...headPos() });
          visitedPos.add(tailPos().str);
        }
        setHeadPos({
          ...headPos(),
          c: headPos().c - 1,
          str: [headPos().r, headPos().c - 1].toString(),
        });
      }
      break;
    case MOVE_UP:
      for (let i = 0; i < dist; i++) {
        if (
          (tailPos().r > headPos().r && tailPos().c < headPos().c) ||
          (tailPos().r > headPos().r && tailPos().c === headPos().c) ||
          (tailPos().r > headPos().r && tailPos().c > headPos().c)
        ) {
          setTailPos({ ...headPos() });
          visitedPos.add(tailPos().str);
        }
        setHeadPos({
          ...headPos(),
          r: headPos().r - 1,
          str: [headPos().r - 1, headPos().c].toString(),
        });
      }
      break;
    case MOVE_DOWN:
      for (let i = 0; i < dist; i++) {
        if (
          (tailPos().r < headPos().r && tailPos().c < headPos().c) ||
          (tailPos().r < headPos().r && tailPos().c === headPos().c) ||
          (tailPos().r < headPos().r && tailPos().c > headPos().c)
        ) {
          setTailPos({ ...headPos() });
          visitedPos.add(tailPos().str);
        }
        setHeadPos({
          ...headPos(),
          r: headPos().r + 1,
          str: [headPos().r + 1, headPos().c].toString(),
        });
      }
      break;
    default: {
      break;
    }
  }
};

const Day09: Component = () => {
  const [inputText] = createResource(inputFile, fetchInputText);
  const [headPos, setHeadPos] = createSignal<Knot>();
  const [tailPos, setTailPos] = createSignal<Knot>();
  const [loop, setLoop] = createSignal<string>(START);

  createEffect(() => {
    if (inputText() && loop() == STOP) {
      const motions = inputText().split("\n");
      const maxLen = calcMaxLen(motions);
      setHeadPos({
        r: maxLen,
        c: maxLen,
        str: [maxLen, maxLen].toString(),
      });
      setTailPos({
        r: maxLen,
        c: maxLen,
        str: [maxLen, maxLen].toString(),
      });
      const visitedPos = new Set<string>();
      visitedPos.add(tailPos().str);

      motions.forEach((motion) => {
        move(visitedPos, headPos, setHeadPos, tailPos, setTailPos, motion);
      });
      console.log(visitedPos.size);
      setLoop(START);
    }
  });

  return (
    <main class="flex flex-auto flex-col items-center justify-center gap-10 rounded border-4 border-green-300 p-6 text-sm md:text-base lg:gap-6 lg:text-lg">
      <h1 class="text-center text-base font-bold md:text-lg lg:text-2xl">
        Day 9: Rope Bridge
      </h1>
      <div class="flex items-center justify-center gap-6">
        <h2 class="font-bold">Part One</h2>
        <button
          class="rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
          onClick={() => (loop() == START ? setLoop(STOP) : setLoop(START))}
        >
          {loop()}
        </button>
      </div>
      <div class="flex h-80 w-80 flex-col items-center justify-center bg-gray-900 p-6 text-center text-[0.45rem] leading-3 sm:h-[32rem] sm:w-[32rem] sm:text-[0.70rem] md:h-[42rem] md:w-[42rem] md:text-sm lg:h-[48rem] lg:w-[48rem] lg:text-base">
        <p class="mt-2 sm:mt-4 md:mt-6 lg:mt-8">To be implemented...</p>
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
};

export default Day09;
