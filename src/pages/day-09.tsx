import { useLocation } from "@solidjs/router";
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

const KNOT_COUNT = 10;

const START_R = 15;
const LENGTH_R = 21;
const START_C = 11;
const LENGTH_C = 26;

const INTERVAL_TIME = 2000;

const EMPTY = ".";
const HEAD = "H";
const VISITED = "#";

const MOVE_RIGHT = "R";
const MOVE_LEFT = "L";
const MOVE_UP = "U";
const MOVE_DOWN = "D";

const initializeLoop = (
  knotsPos: Accessor<Knot[]>,
  setKnotsPos: Setter<Knot[]>,
  setVisitedPos: Setter<Set<string>>
) => {
  setKnotsPos(
    new Array(KNOT_COUNT).fill(0).map(() => ({
      r: START_R,
      c: START_C,
      str: [START_R, START_C].toString(),
    }))
  );
  setVisitedPos(new Set<string>([knotsPos()[KNOT_COUNT - 1].str]));
};

const move = (
  location: Location,
  moveIntervalId: number,
  tailsIntervalId: number,
  visitedPos: Accessor<Set<string>>,
  setVisitedPos: Setter<Set<string>>,
  knotsPos: Accessor<Knot[]>,
  setKnotsPos: Setter<Knot[]>,
  motion: [string, number]
) => {
  const [dir, dist] = motion;

  let i = 0;
  moveIntervalId = setInterval(() => {
    if (location.pathname !== "/day/09") {
      window.clearInterval(moveIntervalId);
    }
    if (i++ < dist) {
      const newHeadPos = { ...knotsPos()[0] };
      switch (dir) {
        case MOVE_RIGHT:
          newHeadPos.c++;
          break;
        case MOVE_LEFT:
          newHeadPos.c--;
          break;
        case MOVE_UP:
          newHeadPos.r--;
          break;
        case MOVE_DOWN:
          newHeadPos.r++;
          break;
        default:
          break;
      }
      newHeadPos.str = [newHeadPos.r, newHeadPos.c].toString();
      setKnotsPos(knotsPos().map((pos, i) => (i === 0 ? newHeadPos : pos)));

      let j = 0;
      tailsIntervalId = setInterval(() => {
        if (location.pathname !== "/day/09") {
          window.clearInterval(tailsIntervalId);
        }
        if (j < KNOT_COUNT - 1) {
          const knotDistR = knotsPos()[j].r - knotsPos()[j + 1].r;
          const knotDistRAbs = Math.abs(knotDistR);
          const knotDistC = knotsPos()[j].c - knotsPos()[j + 1].c;
          const knotDistCAbs = Math.abs(knotDistC);
          const newKnotPos = { ...knotsPos()[j + 1] };

          if (knotDistRAbs > 1 && knotDistCAbs === 0) {
            knotDistR < 0 ? newKnotPos.r-- : newKnotPos.r++;
          } else if (knotDistCAbs > 1 && knotDistRAbs === 0) {
            knotDistC < 0 ? newKnotPos.c-- : newKnotPos.c++;
          } else if (
            (knotDistRAbs > 1 && knotDistCAbs >= 1) ||
            (knotDistCAbs > 1 && knotDistRAbs >= 1)
          ) {
            knotDistR < 0 ? newKnotPos.r-- : newKnotPos.r++;
            knotDistC < 0 ? newKnotPos.c-- : newKnotPos.c++;
          }

          newKnotPos.str = [newKnotPos.r, newKnotPos.c].toString();
          setKnotsPos(
            knotsPos().map((pos, i) => (i === j + 1 ? newKnotPos : pos))
          );
          j++;
        } else {
          const newVisitedPos = new Set<string>(visitedPos());
          newVisitedPos.add(knotsPos()[KNOT_COUNT - 1].str);
          setVisitedPos(newVisitedPos);
          window.clearInterval(tailsIntervalId);
        }
      }, 0);
    } else {
      window.clearInterval(moveIntervalId);
    }
  }, INTERVAL_TIME / dist);
};

const checkKnotIsInRopeSpot = (
  knotsArr: Accessor<Knot[]>,
  ropeR: () => number,
  ropeC: () => number
) => {
  return knotsArr()
    .slice(1)
    .reduce(
      (acc, pos, i) =>
        acc[0] === true
          ? acc
          : ropeR() === pos.r && ropeC() === pos.c
          ? [true, i]
          : [false, null],
      [false, null]
    );
};

const Day09: Component = () => {
  const location = useLocation() as unknown as Location;

  let motions: [string, number][];
  let motionsIdx = 0;

  const rope = new Array(LENGTH_R)
    .fill(0)
    .map(() => new Array(LENGTH_C).fill(EMPTY));
  const [knotsPos, setKnotsPos] = createSignal<Knot[]>();
  const [visitedPos, setVisitedPos] = createSignal<Set<string>>();

  const [run, setRun] = createSignal<boolean>(false);
  let mainIntervalId: number;
  let moveIntervalId: number;
  let tailsIntervalId: number;

  onMount(async () => {
    const response = await fetch(inputFile);
    const inputText = await response.text();
    motions = inputText.split("\n").reduce((acc, m) => {
      const mArrStr = m.split(" ");
      const mArrStrNum = [mArrStr[0], parseInt(mArrStr[1], 10)] as [
        string,
        number
      ];
      acc.push(mArrStrNum);
      return acc;
    }, []);
    initializeLoop(knotsPos, setKnotsPos, setVisitedPos);
  });

  createEffect(() => {
    if (run()) {
      if (motionsIdx < motions.length) {
        move(
          location,
          moveIntervalId,
          tailsIntervalId,
          visitedPos,
          setVisitedPos,
          knotsPos,
          setKnotsPos,
          motions[motionsIdx++]
        );
      }
      mainIntervalId = setInterval(() => {
        if (location.pathname !== "/day/09") {
          window.clearInterval(mainIntervalId);
        }
        if (motionsIdx < motions.length) {
          move(
            location,
            moveIntervalId,
            tailsIntervalId,
            visitedPos,
            setVisitedPos,
            knotsPos,
            setKnotsPos,
            motions[motionsIdx++]
          );
        } else {
          initializeLoop(knotsPos, setKnotsPos, setVisitedPos);
          motionsIdx = 0;
          setRun(false);
        }
      }, INTERVAL_TIME);
    }

    onCleanup(() => {
      clearInterval(mainIntervalId);
      clearInterval(moveIntervalId);
      clearInterval(tailsIntervalId);
    });
  });

  return (
    <main class="flex flex-auto flex-col items-center justify-center gap-10 rounded border-4 border-green-300 p-6 text-sm md:text-base lg:gap-6 lg:text-lg">
      <h1 class="text-center text-base font-bold md:text-lg lg:text-2xl">
        Day 9: Rope Bridge
      </h1>
      <div class="flex items-center justify-center gap-6">
        <h2 class="font-bold">Part Two</h2>
        <button
          class="rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400 disabled:opacity-25 disabled:hover:bg-gray-300"
          onClick={() => setRun(!run())}
          disabled={run()}
        >
          START
        </button>
      </div>
      <div class="flex w-fit items-center justify-center bg-gray-900 p-10 text-base md:text-2xl lg:text-3xl">
        <div class="w-fit">
          <For each={rope}>
            {(row, r) => (
              <div class="flex">
                <For each={row}>
                  {(_, c) => (
                    <div class="w-fit">
                      {knotsPos() &&
                        visitedPos() &&
                        (knotsPos()[0].r === r() && knotsPos()[0].c === c()
                          ? HEAD
                          : checkKnotIsInRopeSpot(knotsPos, r, c)[0] === true
                          ? (checkKnotIsInRopeSpot(
                              knotsPos,
                              r,
                              c
                            )[1] as number) + 1
                          : visitedPos().has([r(), c()].toString())
                          ? VISITED
                          : EMPTY)}
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
