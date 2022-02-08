import React from "react";
import { useDispatch } from "react-redux";
import { types } from "../types/types";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";

const Logout = () => {
  const dispatch = useDispatch();

  const forgetToken = () => {
    localStorage.removeItem("token");
    dispatch({
      type: types.LOGOUT,
      payload: {},
    });
  };

  return (
    <div>
      <IconButton edge="end">
        <Link to="/Login">
          <ExitToAppIcon
            onClick={forgetToken}
            style={{ fontSize: 40, color: "white" }}
          />
        </Link>
      </IconButton>
    </div>
  );
};

export default Logout;
