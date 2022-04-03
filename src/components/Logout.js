import React from "react";
import { useDispatch } from "react-redux";
import { types } from "../types/types";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

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
    <div style={{ textDecoration: "none", color: "#4d4d4d", fontSize: "20px" }}>
      <Tooltip title="Salir">
        <IconButton>
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <ExitToAppIcon
              onClick={forgetToken}
              sx={{ fontSize: 40, color: "#3f51b5" }}
            />
          </Link>
        </IconButton>
      </Tooltip>
      Salir
    </div>
  );
};

export default Logout;
