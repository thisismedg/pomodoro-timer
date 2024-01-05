"use client";

import React from "react";
import { useGlobal } from "../reducer/useContext";
import { formatTime } from "@/helper/time-formater";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, Settings } from "lucide-react";

const PomodoroTimer = () => {
  const { state, dispatch } = useGlobal();
  const startPauseRef: React.RefObject<HTMLAudioElement> = React.useRef(null);
  const endingRef: React.RefObject<HTMLAudioElement> = React.useRef(null);

  const [started, setStarted] = React.useState<boolean>(false);
  const [currentLapse, setCurrentLapse] = React.useState<number>(1);
  const [workTime, setWorkTime] = React.useState<number>(0);
  const [isBreakTime, setIsBreakTime] = React.useState<boolean>(false);

  const playEnding = () => {
    if (!isBreakTime && workTime <= 10 && started) {
      endingRef.current?.play();
    } else {
      endingRef.current?.pause();
    }
  };

  const pauseEnding = () => {
    endingRef.current?.pause();
  };

  React.useEffect(() => {
    while (currentLapse != state.lapse + 1) {
      let timer: any;
      playEnding();
      if (workTime <= 0 && isBreakTime) {
        setTimeout(() => {
          setCurrentLapse((previousLapse: number) => {
            return previousLapse + 1;
          });
        }, 1000);
      }

      if (started && workTime >= 0) {
        document.title = formatTime(workTime);

        timer = setInterval(() => {
          setWorkTime((previousStreamingTime: any) => {
            document.title = formatTime(workTime);

            if (previousStreamingTime <= 0) {
              if (!isBreakTime) {
                if (currentLapse != state.lapse) {
                  setIsBreakTime(true);
                  return currentLapse === state.lapse - 1
                    ? state.longBreak
                    : state.shortBreak;
                } else {
                  pauseEnding();
                  document.title = "Work Done!";
                  return 0;
                }
              } else {
                setIsBreakTime(false);
                return state.workTime;
              }
            }
            return previousStreamingTime - 1;
          });
        }, 1000);
      }
      dispatch({ type: "CHANGE_BREAK_TIME", payload: isBreakTime });
      return () => clearInterval(timer);
    }
  }, [workTime, started, isBreakTime]);

  React.useEffect(() => {
    setWorkTime(state.workTime);
    return () => setWorkTime(0);
  }, [state.workTime]);

  const handleStartPause = () => {
    setStarted(!started);
    startPauseRef.current?.play();
    endingRef.current?.pause();

    if (workTime <= 10 && !started) {
      endingRef.current?.pause();
    }
  };

  const handleReset = () => {
    setIsBreakTime(false);
    endingRef.current?.pause();
    startPauseRef.current?.pause();
    setWorkTime(state.workTime);
    setCurrentLapse(1);
    setStarted(false);
  };


  return (
    <div
      className="w-[100vw] relative h-full grid place-content-center place-items-center"
      style={{
        transition: "background-color 0.5s ease",
        backgroundColor: isBreakTime ? "#4ade80" : "#fed7aa",
      }}
    >
      <Button aria-label="button" variant={"ghost"} className="absolute h-[3rem] w-[3rem] p-0 rounded-full top-5 left-5" onClick={() => dispatch({ type: "CHANGE_SIDEBAR_OPEN", payload: !state.sidebarOpen })}>
        <Settings className="h-[1.5rem] w-[1.5rem]" />
      </Button>
      <div className="grid place-content-center place-items-center">
        <h1
          className="text-zinc-700"
        >
          {currentLapse != state.lapse ? (
            <>
              {currentLapse}{" "}
              {isBreakTime && <>&rarr; {currentLapse + 1}</>} of{" "}
              {state.lapse}
            </>
          ) : (
            "Final"
          )}
        </h1>
        <h1 className="text-[5rem] font-medium text-zinc-700 md:text-[10rem] lg:text-[12rem]">
          {formatTime(workTime)}
        </h1>
        {/* Buttons */}
        <div className="grid gap-5 grid-cols-2">
          <Button
            aria-label="button"
            variant={"ghost"}
            className="h-[5rem] w-[5rem] rounded-full"
            onClick={handleStartPause}
          >
            {!started ? (
              <Play className="h-8 w-8 ml-1" />
            ) : (
              <Pause className="h-8 w-8" />
            )}
          </Button>
          <Button
            aria-label="button"
            variant={"ghost"}
            className="h-[5rem] w-[5rem] rounded-full"
            onClick={handleReset}
          >
            <RotateCcw className="h-8 w-8" />
          </Button>
        </div>
        <audio
          ref={startPauseRef}
          src="/start.wav"
          style={{
            display: "none",
          }}
          loop={false}
        ></audio>
        <audio
          ref={endingRef}
          src="/ending.wav"
          style={{
            display: "none",
          }}
          loop={false}
        ></audio>
      </div>
    </div>
  );
};

export default PomodoroTimer;
