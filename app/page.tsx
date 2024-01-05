import React from "react";
import PomodoroTimer from "./components/pomodoro/pomodoro-timer";
import Navigation from "./components/nav/navigation";

const PomodoroAppRoot = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] h-[100vh] w-full relative overflow-hidden">
      <Navigation />
      <PomodoroTimer />
    </div>
  );
};

export default PomodoroAppRoot;
