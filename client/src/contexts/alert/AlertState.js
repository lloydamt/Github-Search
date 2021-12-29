import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../Types";

const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Set Alert
  const setAlert = (msg, alertType) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  const removeAlert = () => {
    dispatch({ type: REMOVE_ALERT });
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert, removeAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
