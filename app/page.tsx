import React from "react";
import Pomodoro from "./components/pomodoro/page";

const PomodoroApp = () => {

  return (
    <div className="grid place-content-center place-items-center w-[100vw] h-[100vh]">
      <Pomodoro />
    </div>
  );
};

export default PomodoroApp;
