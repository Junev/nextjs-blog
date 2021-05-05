import { useEffect, useReducer } from "react";

const timerRuducer = (state, action) => {
  switch (action.type) {
    case "setTime":
      return { ...state, time: action.time };

    default:
      return state;
  }
};
const Timer = (props) => {
  const [state, dispatch] = useReducer(timerRuducer, {});

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: "setTime", time: new Date().toLocaleString() });
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <div {...props}>{state.time}</div>;
};

export default Timer;
