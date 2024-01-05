"use client";

import React from "react";
import { useGlobal } from "../reducer/useContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button, buttonVariants } from "@/components/ui/button";
import { Equal, Menu, Minus, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatTime } from "@/helper/time-formater";


const Navigation = () => {
  const { state, dispatch } = useGlobal();
  const sidebarRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [lapse, setLapse] = React.useState<number>(state.lapse);
  const [workTime, setWorkTime] = React.useState<number>(state.workTime);
  const [shortBreak, setShortBreak] = React.useState<number>(state.shortBreak);
  const [longBreak, setLongBreak] = React.useState<number>(state.longBreak);

  const handleDecrement = (target: number, setState: React.Dispatch<React.SetStateAction<number>>) => {
    if (target > 0) {
      setState(target < 30 ? 0 : target - 30);
    }
  };

  const handleIncrement = (target: number, setState: React.Dispatch<React.SetStateAction<number>>) => {
    setState(target + 30);
  };

  const handleDispatch = () => {
    dispatch({
      type: "CHANGE_LAPSE",
      payload: lapse,
    });
    dispatch({
      type: "CHANGE_WORK_TIME",
      payload: workTime,
    });
    dispatch({
      type: "CHANGE_SHORT_BREAK",
      payload: shortBreak,
    });
    dispatch({
      type: "CHANGE_LONG_BREAK",
      payload: longBreak,
    });
  };

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        dispatch({
          type: "CHANGE_SIDEBAR_OPEN",
          payload: false,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[23rem] p-4"
      ref={sidebarRef}
      style={{
        transition: "margin-left 0.3s ease-in-out",
        marginLeft: state.sidebarOpen ? "0" : "-23rem",
        backgroundColor: state.breakTime ? "#4ade80" : "#fed7aa",
      }}
    >
      <h1 className="text-1xl mb-10">Settings</h1>
      <div className="flex flex-row justify-between items-center">
        <span>Lapse</span>
        <div className="flex flex-row justify-between items-center gap-4">
          <Button variant={'ghost'} className="w-[2.5rem] h-[2.5rem] rounded-full" onClick={() => {
            if (lapse > 0) {
              setLapse(lapse - 1);
            }
          }}>
            <Minus />
          </Button>
          {lapse} 
          <Button variant={'ghost'} className="w-[2.5rem] h-[2.5rem] rounded-full" onClick={() => {
            setLapse(lapse + 1);
          }}>
            <Plus />
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <span>Work Time</span>
        <div className="flex flex-row justify-between items-center gap-4">
          <Button variant={'ghost'} className="w-[2.5rem] h-[2.5rem] rounded-full" onClick={() => handleDecrement(workTime, setWorkTime)}>
            <Minus />
          </Button>
          {formatTime(workTime)} min
          <Button variant={'ghost'} className="w-[2.5rem] h-[2.5rem] rounded-full" onClick={() => handleIncrement(workTime, setWorkTime)}>
            <Plus />
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <span>Short Break</span>
        <div className="flex flex-row justify-between items-center gap-4">
          <Button variant={'ghost'} className="w-[2.5rem] h-[2.5rem] rounded-full" onClick={() => handleDecrement(shortBreak, setShortBreak)}>
            <Minus />
          </Button>
          {formatTime(shortBreak)} min
          <Button variant={'ghost'} className="w-[2.5rem] h-[2.5rem] rounded-full" onClick={() => handleIncrement(shortBreak, setShortBreak)}>
            <Plus />
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <span>Long Break</span>
        <div className="flex flex-row justify-between items-center gap-4">
          <Button variant={'ghost'} className="w-[2.5rem] h-[2.5rem] rounded-full" onClick={() => handleDecrement(longBreak, setLongBreak)}>
            <Minus />
          </Button>
          {formatTime(longBreak)} min
          <Button variant={'ghost'} className="w-[2.5rem] h-[2.5rem] rounded-full" onClick={() => handleIncrement(longBreak, setLongBreak)}>
            <Plus />
          </Button>
        </div>
      </div>

      <Button
        className="w-full mt-4"
        onClick={() => {
          handleDispatch();
          dispatch({
            type: "CHANGE_SIDEBAR_OPEN",
            payload: false,
          });
        }}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default Navigation;
