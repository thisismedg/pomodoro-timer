"use client";

import React, { ReactHTMLElement } from "react";
import { Play, Pause, RotateCcw, Heart, Github, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@radix-ui/react-progress";
import Link from "next/link";

const Pomodoro = () => {
  const audioRef: React.RefObject<HTMLAudioElement> = React.useRef(null);
  const endingAudio: React.RefObject<HTMLAudioElement> = React.useRef(null);

  const [time, setTime]: any = React.useState(1500); // 25 minutes in seconds
  const [started, setStarted] = React.useState(false);
  const [isBreak, setIsBreak] = React.useState(false);

  React.useEffect(() => {
    let timer: any;

    if (time <= 30 && isBreak === false) {
      endingAudio.current?.play();
    } else {
      endingAudio.current?.pause();
    }

    if (started && time >= 0) {
      document.title = formatTime(time);
      timer = setInterval(() => {
        setTime((previousTime: any) => {
          document.title = formatTime(time);
          if (previousTime === 0) {
            if (!isBreak) {
              setIsBreak(true);
              return 900;
            } else {
              setIsBreak(false);
              return 1500;
            }
          }
          return previousTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
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

    if (time <= 30) {
      endingAudio.current?.pause();
    }
  };

  const handleReset = () => {
    setIsBreak(false);
    setStarted(false);
    setTime(1500);
  };

  return (
    <div className="group grid place-content-center relative place-items-center w-[100vw] h-[100vh] isolate">
      <Progress
        role="progressbar"
        id="Time Display"
        aria-labelledby="Time Display"
        value={time}
        className="fixed top-0 left-0 h-[100vh] bg-orange-20 transition-all"
        style={{
          width: `${(time / (isBreak ? 900 : 1500)) * 100}%`, // Calculate width based on the timer
          transition: "width 1s linear", // Smooth transition over 1 second
          backgroundColor: !isBreak ? "rgb(254 215 170)" : "rgb(34 197 94)",
        }}
      />
      <div className="grid place-content-center place-items-center z-50">
        <h1 className="text-zinc-700">{!isBreak ? "Working" : "Break Time"}</h1>
        <h1 className="text-[5rem] text-zinc-700 md:text-[10rem] lg:text-[12rem]">
          {formatTime(time)}
        </h1>
        <div className="grid grid-cols-[1fr_auto] gap-5 place-content-end">
          <Button
            variant={"ghost"}
            className="flex flex-row gap-3 justify-center items-center h-[5rem] w-[5rem] text-zinc-700 rounded-full hover:bg-orange-300"
            onClick={handleStartPause}
            aria-label="Start/Pause"
          >
            {!started ? (
              <Play className="h-8 w-8 ml-1" />
            ) : (
              <Pause className="h-8 w-8" />
            )}
          </Button>
          <Button
            variant={"ghost"}
            className="flex flex-row gap-3 justify-center items-center h-[5rem] w-[5rem] text-zinc-700 rounded-full hover:bg-orange-300"
            onClick={handleReset}
            aria-label="Reset Pomodoro / Skip"
          >
            <RotateCcw className="h-8 w-8" />
          </Button>
        </div>
      </div>
      <div className="fixed left-0 bottom-0 p-10 flex flex-row justify-between items-center w-[100vw] opacity-0 group-hover:opacity-100">
        <ul className="flex flex-row gap-5 mx-auto text-zinc-700">
          <li>
            <Link
              href={"https://github.com/thisismedg/"}
              target="_blank"
              aria-label="Follow me on Github"
            >
              <Github />
            </Link>
          </li>
          <li>
            <Link
              href={"https://facebook.com/thisismedg"}
              target="_blank"
              aria-label="Follow me on Facebook"
            >
              <Facebook />
            </Link>
          </li>
        </ul>
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
    </div>
  );
};

export default Pomodoro;
