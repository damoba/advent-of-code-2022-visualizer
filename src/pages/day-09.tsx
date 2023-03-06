import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
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

const initializeLoop = (
  setHeadPos: Setter<Knot>,
  maxLen: number,
  tailPos: Accessor<Knot>,
  setTailPos: Setter<Knot>,
  visitedPos: { val: Set<string> }
) => {
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
  visitedPos.val = new Set<string>();
  visitedPos.val.add(tailPos().str);
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
  visitedPos: { val: Set<string> },
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
          visitedPos.val.add(tailPos().str);
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
          visitedPos.val.add(tailPos().str);
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
          visitedPos.val.add(tailPos().str);
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
          visitedPos.val.add(tailPos().str);
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
  let motions = [];
  let motionsCache = [];
  let maxLen = 0;

  const [headPos, setHeadPos] = createSignal<Knot>();
  const [tailPos, setTailPos] = createSignal<Knot>();
  let visitedPos = { val: new Set<string>() };

  const [loop, setLoop] = createSignal<boolean>(false);

  onMount(async () => {
    const response = await fetch(inputFile);
    const inputText = await response.text();
    motions = inputText.split("\n");
    motionsCache = [...motions];
    maxLen = calcMaxLen(motions);
    initializeLoop(setHeadPos, maxLen, tailPos, setTailPos, visitedPos);
  });

  createEffect(() => {
    let intervalId: number;
    if (loop() && motions) {
      intervalId = setInterval(() => {
        if (motions.length > 0) {
          move(
            visitedPos,
            headPos,
            setHeadPos,
            tailPos,
            setTailPos,
            motions.shift()
          );
          console.log(visitedPos.val.size);
        } else {
          initializeLoop(setHeadPos, maxLen, tailPos, setTailPos, visitedPos);
          motions = [...motionsCache];
        }
      }, 5);
    }
    onCleanup(() => clearInterval(intervalId));
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
          onClick={() => setLoop(!loop())}
        >
          {loop() ? STOP : START}
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
