import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
  Setter,
} from "solid-js";
import inputFile from "../inputs/day-09.txt";

type Knot = { r: number; c: number; str: string };

const START_R = 15;
const RIGHT_R = 20;
const START_C = 11;
const RIGHT_C = 25;

const START = "START";
const PAUSE = "PAUSE ON NEXT INSTRUCTION";

const INTERVAL_TIME = 2000;

const EMPTY = ".";
const HEAD = "H";
const TAIL = "T";

const MOVE_RIGHT = "R";
const MOVE_LEFT = "L";
const MOVE_UP = "U";
const MOVE_DOWN = "D";

const initializeLoop = (
  setHeadPos: Setter<Knot>,
  tailPos: Accessor<Knot>,
  setTailPos: Setter<Knot>,
  visitedPos: { val: Set<string> }
) => {
  setHeadPos({
    r: START_R,
    c: START_C,
    str: [START_R, START_C].toString(),
  });
  setTailPos({
    r: START_R,
    c: START_C,
    str: [START_R, START_C].toString(),
  });
  visitedPos.val = new Set<string>();
  visitedPos.val.add(tailPos().str);
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
  loop: Accessor<boolean>,
  visitedPos: { val: Set<string> },
  headPos: Accessor<Knot>,
  setHeadPos: Setter<Knot>,
  tailPos: Accessor<Knot>,
  setTailPos: Setter<Knot>,
  motion: string
) => {
  const [dir, dist]: [string, number] = parseMotion(motion) as [string, number];

  if (dir === MOVE_RIGHT) {
    let i = 0;
    let intervalId = setInterval(() => {
      if (i++ < dist) {
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
      } else {
        window.clearInterval(intervalId);
      }
    }, INTERVAL_TIME / dist);
  } else if (dir === MOVE_LEFT) {
    let i = 0;
    let intervalId = setInterval(() => {
      if (i++ < dist) {
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
      } else {
        window.clearInterval(intervalId);
      }
    }, INTERVAL_TIME / dist);
  } else if (dir === MOVE_UP) {
    let i = 0;
    let intervalId = setInterval(() => {
      if (i++ < dist) {
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
      } else {
        window.clearInterval(intervalId);
      }
    }, INTERVAL_TIME / dist);
  } else if (dir === MOVE_DOWN) {
    let i = 0;
    let intervalId = setInterval(() => {
      if (i++ < dist) {
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
      } else {
        window.clearInterval(intervalId);
      }
    }, INTERVAL_TIME / dist);
  }
};

const Day09: Component = () => {
  let motions = [];
  let motionsCache = [];

  const world = new Array(RIGHT_R + 1)
    .fill(0)
    .map(() => new Array(RIGHT_C + 1).fill(EMPTY));
  const [headPos, setHeadPos] = createSignal<Knot>();
  const [tailPos, setTailPos] = createSignal<Knot>();
  let visitedPos = { val: new Set<string>() };

  const [loop, setLoop] = createSignal<boolean>(false);

  onMount(async () => {
    const response = await fetch(inputFile);
    const inputText = await response.text();
    motions = inputText.split("\n");
    motionsCache = [...motions];
    initializeLoop(setHeadPos, tailPos, setTailPos, visitedPos);
  });

  createEffect(() => {
    let intervalId: number;
    if (loop() && motions) {
      if (motions.length > 0) {
        move(
          loop,
          visitedPos,
          headPos,
          setHeadPos,
          tailPos,
          setTailPos,
          motions.shift()
        );
      }
      intervalId = setInterval(() => {
        if (motions.length > 0) {
          move(
            loop,
            visitedPos,
            headPos,
            setHeadPos,
            tailPos,
            setTailPos,
            motions.shift()
          );
        } else {
          initializeLoop(setHeadPos, tailPos, setTailPos, visitedPos);
          motions = [...motionsCache];
        }
      }, INTERVAL_TIME);
    }
    onCleanup(() => clearInterval(intervalId));
  });

  return (
    <main class="flex flex-auto flex-col items-center justify-center gap-10 rounded border-4 border-green-300 p-6 text-sm md:text-base lg:gap-6 lg:text-lg">
      <h1 class="text-center text-base font-bold md:text-lg lg:text-2xl">
        Day 9: Rope Bridge
      </h1>
      <div class="flex items-center justify-center gap-6">
        <h2 class="font-bold">Part Two</h2>
        <button
          class="rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
          onClick={() => setLoop(!loop())}
        >
          {loop() ? PAUSE : START}
        </button>
      </div>
      <div class="flex w-fit items-center justify-center bg-gray-900 p-10 text-base leading-3 sm:text-base md:text-2xl lg:text-3xl">
        <div class="w-fit">
          <For each={world}>
            {(row, r) => (
              <div class="flex">
                <For each={row}>
                  {(_, c) => (
                    <div class="w-fit">
                      {headPos() && headPos().r === r() && headPos().c === c()
                        ? HEAD
                        : tailPos() &&
                          tailPos().r === r() &&
                          tailPos().c === c()
                        ? TAIL
                        : EMPTY}
                    </div>
                  )}
                </For>
              </div>
            )}
          </For>
        </div>
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
