export const initialState = {
  lapse: 4,
  workTime:  1500,
  shortBreak: 300,
  longBreak: 900,
  breakTime: false,
  sidebarOpen: false,
};

export type ActionType =
  | {
      type: "CHANGE_LAPSE";
      payload: number;
    }
  | {
      type: "CHANGE_WORK_TIME";
      payload: number;
    }
  | {
      type: "CHANGE_SHORT_BREAK";
      payload: number;
    }
  | {
      type: "CHANGE_LONG_BREAK";
      payload: number;
    }
  | {
      type: "CHANGE_BREAK_TIME";
      payload: boolean;
    }
  | {
      type: "CHANGE_SIDEBAR_OPEN";
      payload: boolean;
    };
// Add your action types here

export const GlobalReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_LAPSE":
      return {
        ...state,
        lapse: action.payload,
      };
    case "CHANGE_WORK_TIME":
      return {
        ...state,
        workTime: action.payload,
      };
    case "CHANGE_SHORT_BREAK":
      return {
        ...state,
        shortBreak: action.payload,
      };
    case "CHANGE_LONG_BREAK":
      return {
        ...state,
        longBreak: action.payload,
      };
    case "CHANGE_BREAK_TIME":
      return {
        ...state,
        breakTime: action.payload,
      };
    case "CHANGE_SIDEBAR_OPEN":
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    default:
      return state;
  }
};
