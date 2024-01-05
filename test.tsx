"use client";

import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGlobal } from "../reducer/useContext";

const Pomodoro = () => {
  const { state, dispatch } = useGlobal();

  const audioRef: React.RefObject<HTMLAudioElement> = React.useRef(null);
  const endingAudio: React.RefObject<HTMLAudioElement> = React.useRef(null);
  const endRef: React.RefObject<HTMLAudioElement> = React.useRef(null);

  const [time, setTime]: any = React.useState(state.time); // 25 minutes in seconds
  const [started, setStarted] = React.useState(false);
  const [isBreak, setIsBreak] = React.useState(false);
  const [lapse, setLapse] = React.useState(state.lapse);
  const [currentLapse, setCurrentLapse] = React.useState(state.currentLapse);
  const [workTime, setWorkTime] = React.useState(state.workTime);
  const [shortBreak, setShortBreak] = React.useState(state.shortBreak);
  const [longBreak, setLongBreak] = React.useState(state.longBreak);

  React.useEffect(() => {
    while (currentLapse != lapse + 1) {
      let timer: any;

      if (time <= 10 && isBreak === false) {
        endingAudio.current?.play();
      } else {
        endingAudio.current?.pause();
      }

      if (time <= 0 && isBreak) {
        setTimeout(() => {
          setCurrentLapse((previousLapse: number) => previousLapse + 1);
        }, 1000);
      }

      if (started && time >= 0) {
        document.title = formatTime(time);

        timer = setInterval(() => {
          setTime((previousTime: any) => {
            document.title = formatTime(time);

            if (previousTime <= 0) {
              endRef.current?.play();

              if (!state.isBreak.status) {
                if (currentLapse != lapse) {
                  dispatch({
                    type: "TOGGLE_BREAK",
                    payload: [true, state.isBreak.theme, state.isBreak.color],
                  });
                  return currentLapse === 3 ? longBreak : shortBreak;
                }

                endingAudio.current?.pause();
                endRef.current?.pause();
                document.title = "Work Done!";
                return 0;
              } else {
                dispatch({
                  type: "TOGGLE_BREAK",
                  payload: [true, state.isBreak.theme, state.isBreak.color],
                });
                return workTime;
              }
            }

            return previousTime - 1;
          });
        }, 1000);
      }

      return () => clearInterval(timer);
    }
  }, [time, started, isBreak]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setStarted(!started);
    audioRef.current?.play();
    endingAudio.current?.pause();

    if (time <= 10) {
      endingAudio.current?.pause();
    }
  };

  const handleReset = () => {
    setIsBreak(false);
    setStarted(false);
    setTime(1500);
    setCurrentLapse(1);
  };

  return (
    <div
      className="group grid place-content-center relative place-items-center h-full isolate"
      style={{
        backgroundColor: state.isBreak.status ? "#181818" : "transparent",
      }}
    >
      <div className="grid place-content-center place-items-center z-50 relative">
        <h1
          className="text-zinc-700"
          style={{
            color: state.isBreak.status ? "#eee" : "#181818",
          }}
        >
          {currentLapse != lapse ? (
            <>
              {currentLapse}{" "}
              {state.isBreak.status && <>&rarr; {currentLapse + 1}</>} of{" "}
              {lapse}
            </>
          ) : (
            "Final"
          )}
        </h1>
        <h1
          className="text-[5rem] font-medium text-zinc-700 md:text-[10rem] lg:text-[12rem]"
          style={{
            color: state.isBreak.status ? "#eee" : "#181818",
          }}
        >
          {formatTime(time)}
        </h1>
        <div className="grid grid-cols-[1fr_auto] gap-5 place-content-end">
          <Button
            variant={"ghost"}
            className="flex flex-row gap-3 justify-center items-center h-[5rem] w-[5rem] text-zinc-700 rounded-full hover:bg-gray-50"
            onClick={handleStartPause}
            aria-label="Start/Pause"
            title="Start / Pause"
            style={{
              color: state.isBreak.status ? "#eee" : "#181818",
            }}
          >
            {!started ? (
              <Play className="h-8 w-8 ml-1" />
            ) : (
              <Pause className="h-8 w-8" />
            )}
          </Button>
          <Button
            variant={"ghost"}
            className="flex flex-row gap-3 justify-center items-center h-[5rem] w-[5rem] text-zinc-700 rounded-full hover:bg-gray-50"
            onClick={handleReset}
            aria-label="Reset Pomodoro / Skip"
            title="Reset / Skip"
            style={{
              color: state.isBreak.status ? "#eee" : "#181818",
            }}
          >
            <RotateCcw className="h-8 w-8" />
          </Button>
        </div>
      </div>
      <audio
        ref={audioRef}
        src="/start.wav"
        style={{
          display: "none",
        }}
      ></audio>
      <audio
        ref={endingAudio}
        src="/ending.wav"
        style={{
          display: "none",
        }}
        loop={false}
      ></audio>
      <audio
        ref={endRef}
        src="/end.wav"
        style={{
          display: "none",
        }}
        loop={false}
      ></audio>
    </div>
  );
};

export default Pomodoro;
